import mandelRaw from "../shaders/formulas/escape/mandelbrot.frag?raw";
import magnetRaw from "../shaders/formulas/escape/magnet.frag?raw";
import shipRaw from "../shaders/formulas/escape/burning_ship.frag?raw";
import tricornRaw from "../shaders/formulas/escape/tricorn.frag?raw";
import buffaloRaw from "../shaders/formulas/escape/buffalo.frag?raw";
import celticRaw from "../shaders/formulas/escape/celtic.frag?raw";
import invExpRaw from "../shaders/formulas/escape/inv_exp.frag?raw";
import invMandelRaw from "../shaders/formulas/escape/inv_mandel.frag?raw";
import spiderRaw from "../shaders/formulas/escape/spider.frag?raw";
import heartRaw from "../shaders/formulas/escape/heart.frag?raw";
import lambdaRaw from "../shaders/formulas/escape/lambda.frag?raw";
import newtonStdRaw from "../shaders/formulas/newton/newton_std.frag?raw";
import newtonSinRaw from "../shaders/formulas/newton/newton_sin.frag?raw";
import { BASE_CONTROL_GROUPS } from "./ui/base-control-groups";
import type { FormulaDefinition } from "../types/ui";

export const FORMULAS: FormulaDefinition[] = [
  {
    id: "mandelbrot",
    name: "Mandelbrot",
    fractalType: "escape",
    displayString: "z² + c",
    shaderSource: mandelRaw,
    customUI: [
      ...BASE_CONTROL_GROUPS.escape,
      {
        label: "Julia Morph",
        colorKey: "julia",
        sliders: [{ paramKey: "juliaMorph", min: 0, max: 5 }],
      },
    ],
    defaults: { zoom: 2.5, offsetShiftX: -0.3, power: 2.0 },
  },
  {
    id: "burning-ship",
    name: "Burning Ship",
    fractalType: "escape",
    displayString: "(|Re(z)| + i|Im(z)|)² + c",
    shaderSource: shipRaw,
    defaults: { zoom: 3.0, offsetShiftX: -0.5, offsetShiftY: -0.5, power: 2.0 },
  },
  {
    id: "magnet",
    name: "Magnet M1",
    fractalType: "escape",
    displayString: "((z²+c-1)/(2z+c-2))²",
    shaderSource: magnetRaw,
    defaults: { zoom: 4.0, offsetShiftX: 0.0, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "tricorn",
    name: "Tricorn",
    fractalType: "escape",
    displayString: "conj(z)² + c",
    shaderSource: tricornRaw,
    defaults: { zoom: 2.8, offsetShiftX: 0.0, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "buffalo",
    name: "Buffalo",
    fractalType: "escape",
    displayString: "|Re(z)² - Im(z)²| + c",
    shaderSource: buffaloRaw,
    defaults: { zoom: 3.2, offsetShiftX: -0.3, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "celtic",
    name: "Celtic",
    fractalType: "escape",
    displayString: "|Re(z²)| + iIm(z²) + c",
    shaderSource: celticRaw,
    defaults: { zoom: 2.5, offsetShiftX: -0.2, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "inv-mandel",
    name: "Inverted Mandelbrot",
    fractalType: "escape",
    displayString: "z² + 1/c",
    shaderSource: invMandelRaw,
    defaults: { zoom: 0.8, offsetShiftX: 0.0, power: 2.0 },
  },
  {
    id: "inv-exp",
    name: "Inverted Exponent",
    fractalType: "escape",
    displayString: "1/z² + c",
    shaderSource: invExpRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0 },
  },
  {
    id: "lambda",
    name: "Lambda",
    fractalType: "escape",
    displayString: "c · z(1-z)",
    shaderSource: lambdaRaw,
    defaults: { zoom: 1.5, offsetShiftX: 0.5, power: 1.0 },
  },
  {
    id: "spider",
    name: "Spider",
    fractalType: "escape",
    displayString: "zₙ₊₁ = zₙ² + cₙ, cₙ₊₁ = cₙ/2 + zₙ",
    shaderSource: spiderRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0, memoryR: 0.5 },
  },
  {
    id: "heart",
    name: "Heart",
    fractalType: "escape",
    displayString: "(|Re(z)| + iIm(z))² + c",
    shaderSource: heartRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0 },
  },

  // Newton formulas
  {
    id: "newton-std",
    name: "Newton Standard",
    fractalType: "newton",
    displayString: "zᴾ - 1 = 0",
    shaderSource: newtonStdRaw,
    defaults: { zoom: 3.0, offsetShiftX: 0.0, power: 3.0 },
  },
  {
    id: "newton-sin",
    name: "Newton Sine",
    fractalType: "newton",
    displayString: "zₙ₊₁ = z - a·tan(z)",
    shaderSource: newtonSinRaw,
    defaults: { zoom: 5.0, offsetShiftX: 0.0, power: 1.0, subtrahend: 0.0 },
  },
];
