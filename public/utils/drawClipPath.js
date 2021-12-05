import { createElementNS } from "./createElementNS.js";
import { columnScale } from "./columnScale.js";

export const drawClipPath = (svgCanvas, gridLineGroup) => {
  const defs = createElementNS("defs", svgCanvas);
  const canvasWidth = +gridLineGroup.getAttributeNS(null, "width");
  const columnWidth = canvasWidth / (11 * 1.5);
  const barHeight = 642;

  for (let i = 0; i <= 10; i++) {
    const clipPath = createElementNS("clipPath", defs, {
      id: `path${i}`,
      clipPathUnits: "userSpaceOnUse",
    });

    const xOffset = columnScale(i, columnWidth);
    createElementNS("rect", clipPath, {
      x: xOffset,
      y: 68,
      width: columnWidth,
      height: barHeight,
      rx: 6,
      ry: 6,
    });
  }
};
