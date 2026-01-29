import mandelRaw from "../shaders/escape/mandelbrot.frag?raw";
import magnetRaw from "../shaders/escape/magnet.frag?raw";
import shipRaw from "../shaders/escape/burning_ship.frag?raw";
import tricornRaw from "../shaders/escape/tricorn.frag?raw";
import buffaloRaw from "../shaders/escape/buffalo.frag?raw";
import celticRaw from "../shaders/escape/celtic.frag?raw";
import invExpRaw from "../shaders/escape/inv_exp.frag?raw";
import invMandelRaw from "../shaders/escape/inv_mandel.frag?raw";
import spiderRaw from "../shaders/escape/spider.frag?raw";
import heartRaw from "../shaders/escape/heart.frag?raw";
import lambdaRaw from "../shaders/escape/lambda.frag?raw";
import type { FormulaDefinition } from "../types/formula-definition";

export const FORMULAS: FormulaDefinition[] = [
  {
    id: "mandelbrot",
    name: "Mandelbrot",
    fractalType: "escape",
    mathSymbol: "z² + c",
    shaderSource: mandelRaw,
    defaults: { zoom: 2.5, offsetShiftX: -0.3, power: 2.0 },
  },
  {
    id: "burning-ship",
    name: "Burning Ship",
    fractalType: "escape",
    mathSymbol: "(|Re(z)| + i|Im(z)|)² + c",
    shaderSource: shipRaw,
    defaults: { zoom: 3.0, offsetShiftX: -0.5, offsetShiftY: -0.5, power: 2.0 },
  },
  {
    id: "magnet",
    name: "Magnet M1",
    fractalType: "escape",
    mathSymbol: "((z²+c-1)/(2z+c-2))²",
    shaderSource: magnetRaw,
    defaults: { zoom: 4.0, offsetShiftX: 0.0, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "tricorn",
    name: "Tricorn",
    fractalType: "escape",
    mathSymbol: "conj(z)² + c",
    shaderSource: tricornRaw,
    defaults: { zoom: 2.8, offsetShiftX: 0.0, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "buffalo",
    name: "Buffalo",
    fractalType: "escape",
    mathSymbol: "|Re(z)² - Im(z)²| + c",
    shaderSource: buffaloRaw,
    defaults: { zoom: 3.2, offsetShiftX: -0.3, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "celtic",
    name: "Celtic",
    fractalType: "escape",
    mathSymbol: "|Re(z²)| + iIm(z²) + c",
    shaderSource: celticRaw,
    defaults: { zoom: 2.5, offsetShiftX: -0.2, offsetShiftY: 0.0, power: 2.0 },
  },
  {
    id: "inv-mandel",
    name: "Inverted Mandelbrot",
    fractalType: "escape",
    mathSymbol: "z² + 1/c",
    shaderSource: invMandelRaw,
    defaults: { zoom: 0.8, offsetShiftX: 0.0, power: 2.0 },
  },
  {
    id: "inv-exp",
    name: "Inverted Exponent",
    fractalType: "escape",
    mathSymbol: "1/z² + c",
    shaderSource: invExpRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0 },
  },
  {
    id: "lambda",
    name: "Lambda",
    fractalType: "escape",
    mathSymbol: "c · z(1-z)",
    shaderSource: lambdaRaw,
    defaults: { zoom: 1.5, offsetShiftX: 0.5, power: 1.0 },
  },
  {
    id: "spider",
    name: "Spider",
    fractalType: "escape",
    mathSymbol: "zₙ₊₁ = zₙ² + cₙ, cₙ₊₁ = cₙ/2 + zₙ",
    shaderSource: spiderRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0, memoryR: 0.5 },
  },
  {
    id: "heart",
    name: "Heart",
    fractalType: "escape",
    mathSymbol: "(|Re(z)| + iIm(z))² + c",
    shaderSource: heartRaw,
    defaults: { zoom: 2.5, offsetShiftX: 0.0, power: 2.0 },
  },
];
