import { onMounted, onUnmounted, type Ref } from "vue";
import { useFractalStore } from "../store/fractalStore";
import vertSource from "../shaders/base.vert";
import fragSource from "../shaders/nova.frag";

export function useFractalEngine(canvasRef: Ref<HTMLCanvasElement | null>) {
  const store = useFractalStore();
  let gl: WebGLRenderingContext;
  let program: WebGLProgram;
  let animationFrameId: number;

  const uniformLocations: Record<string, WebGLUniformLocation | null> = {};

  const createShader = (type: number, source: string): WebGLShader => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Could not compile shader: ${info}`);
    }
    return shader;
  };

  const init = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    gl = canvas.getContext("webgl")!;

    program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragSource));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Could not link WebGL program");
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    const uniformNames = [
      "resolution",
      "zoom",
      "relaxation",
      "powerMain",
      "powerDerivative",
      "maxIterations",
      "subtrahend",
      "offsetShiftX",
      "offsetShiftY",
      "seedX",
      "seedY",
      "isJulia",
      "juliaMorph",
    ];

    uniformNames.forEach((name) => {
      uniformLocations[name] = gl.getUniformLocation(program, name);
    });

    render();
  };

  const render = () => {
    if (!canvasRef.value || !gl) return;
    const canvas = canvasRef.value;

    store.smoothedX += (store.mouseX - store.smoothedX) * 0.08;
    store.smoothedY += (store.mouseY - store.smoothedY) * 0.08;

    const displayWidth = Math.floor(canvas.clientWidth);
    const displayHeight = Math.floor(canvas.clientHeight);

    if (
      Math.abs(canvas.width - displayWidth) > 1 ||
      Math.abs(canvas.height - displayHeight) > 1
    ) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // 2. Set Resolution (Stable)
    const resLoc = uniformLocations["resolution"];
    if (resLoc) {
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    }

    // 3. Set Uniforms (using a local helper to avoid redundant store access)
    const setUniform = (name: string, val: number) => {
      const loc = uniformLocations[name];
      if (loc) gl.uniform1f(loc, val);
    };

    const getModifiedValue = (varName: string, baseValue: number) => {
      let val = baseValue;
      const sens = varName.includes("power") ? 0.3 : 1.0;

      // Use smoothedX/Y instead of mouseX/Y
      if (store.bindingsX.includes(varName)) val += store.smoothedX * sens;
      if (store.bindingsY.includes(varName)) val += store.smoothedY * sens;

      return val;
    };

    const varKeys = Object.keys(store.params);

    varKeys.forEach((key) => {
      // @ts-ignore
      const baseVal = store.params[key];
      const liveVal = getModifiedValue(key, baseVal);

      if (store.isPaused) {
        // If we don't have a frozen value for this yet, capture it now
        if (store.frozenValues[key] === undefined) {
          store.frozenValues[key] = liveVal;
        }
        // Send the STAGNANT value to the GPU
        setUniform(key, store.frozenValues[key]);
      } else {
        // If we are playing, clear the frozen cache and send live values
        delete store.frozenValues[key];
        setUniform(key, liveVal);
        store.liveParams[key] = liveVal;
      }
    });

    setUniform("zoom", store.zoom);
    setUniform("offsetShiftX", store.offsetShiftX);
    setUniform("offsetShiftY", store.offsetShiftY);

    const locJulia = uniformLocations["isJulia"];
    if (locJulia) {
      // Pass 1 for true, 0 for false
      gl.uniform1i(locJulia, store.isJulia ? 1 : 0);
    }

    // 4. Time Calculation (Local)

    //   const currentTime = store.isPaused ? store.frozenTime : performance.now() / 1000;
    // if (!store.isPaused) store.frozenTime = currentTime;
    // setUniform("time", currentTime);

    const currentTime = performance.now() / 1000;
    setUniform("time", currentTime);

    // ONLY update the store if you really need to see the time in the UI
    // store.time = currentTime; // Remove or throttle this!

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrameId = requestAnimationFrame(render);
  };

  onMounted(init);
  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
}
