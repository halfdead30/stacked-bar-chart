import { createElementNS } from "./createElementNS.js";
import { columnScale } from "./columnScale.js";
import { barsArea } from "../script.js";

export const generateBarText = (actualHeight, gridLineGroup, item) => {
  const { stack, height, stackName, percent, mean } = item;
  const canvasWidth = +gridLineGroup.getAttributeNS(null, "width");
  const columnWidth = canvasWidth / (11 * 1.5);
  const xOffset = columnScale(stack, columnWidth);

  const barGroup = createElementNS("g", barsArea, {
    class: "bar-group",
    ["data-id"]: `${percent}`,
  });

  createElementNS("rect", barGroup, {
    width: columnWidth,
    height: `${height}`,
    x: `${xOffset}`,
    y: `${actualHeight - height}`,
    ["class"]: `gridline-group__rect ${stackName}`,
    ["clip-path"]: `url(#path${stack})`,
  });

  if (height > 15) {
    createElementNS("text", barGroup, {
      x: `${xOffset + columnWidth / 2}`,
      y: `${actualHeight - height / 2}`,
      fill: "#fff",
      ["dominant-baseline"]: "middle",
      ["text-anchor"]: "middle",
      ["class"]: "gridline-group__rect-text",
    }).textContent = `${Math.floor(mean)}$`;
  }
};
