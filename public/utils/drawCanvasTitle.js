import { createElementNS } from "./createElementNS.js";
import { generateTitle } from "./generateTitle.js";

export const drawCanvasTitle = (svgCanvas, selected) => {
  const canvasWidth = 1190;

  createElementNS("text", svgCanvas, {
    x: `${canvasWidth / 5}`,
    y: `40`,
    fill: "#fff",
    ["font-size"]: "16",
    ["class"]: "canvas__title",
  }).textContent = generateTitle(selected);
};
