import { createElementNS } from "../utils/createElementNS.js";

export const drawGraphCanvas = (container) => {
  const svgCanvas = createElementNS("svg", container, {
    viewBox: "0 0 1100 800",
    width: "1200",
    height: "800",
    fill: "#000",
    ["class"]: "canvas",
  });

  // X and Y Axis
  const axisGroup = createElementNS("g", svgCanvas, {
    id: "axis-group",
  });
  createElementNS("line", axisGroup, {
    x1: "0",
    y1: "711",
    x2: "1090",
    y2: "712",
    stroke: "#fff",
    ["stroke-width"]: "3",
  });
  createElementNS("line", axisGroup, {
    x1: "0",
    y1: "68",
    x2: "0",
    y2: "712",
    stroke: "#fff",
    ["stroke-width"]: "3",
  });
  // X and Y Axis

  // Gridlines pattern
  const defsGridline = createElementNS("defs", svgCanvas);
  const gridPattern = createElementNS("pattern", defsGridline, {
    id: "gridline",
    x: "0",
    y: "0",
    height: "65",
    width: "1190",
    patternUnits: "userSpaceOnUse",
  });
  createElementNS("line", gridPattern, {
    x1: "0",
    y1: "0",
    x2: "1090",
    y2: "0",
    stroke: "#fff",
    ["stroke-width"]: "5",
  });
  const gridlineGroup = createElementNS("g", svgCanvas, {
    ["class"]: "gridline-group",
    width: "1090",
    height: "660",
    transform: "translate(0, -64)",
  });
  createElementNS("rect", gridlineGroup, {
    id: "gridline-area",
    x: "0",
    y: "68",
    width: "1090",
    height: "660",
    fill: `url(#${gridPattern.id})`,
  });
  // Gridlines pattern

  // Y axis numbers
  const labelsGroup = createElementNS("g", svgCanvas, {
    ["class"]: "y-axis-values",
    transform: "translate(-30, 710)",
  });

  const yOffset = 64;

  for (let i = 0; i <= 10; i++) {
    createElementNS("text", labelsGroup, {
      x: `${!i ? 14 : 6}`,
      y: `-${yOffset * i}`,
      fill: "#fff",
    }).textContent = `${!i ? 0 : i + "0"}`;
  }
  // Y axis numbers

  // Years
  const yearsGroup = createElementNS("g", svgCanvas, {
    ["class"]: "years-group",
  });

  const columnWidth = 1090 / (11 * 1.5);
  const columnSpacing = columnWidth / 2;
  const xOffset = 10;

  for (let i = 0; i <= 10; i++) {
    createElementNS("text", yearsGroup, {
      x: !i
        ? xOffset
        : xOffset + i * (columnWidth + columnSpacing) + columnSpacing,
      y: "730",
      fill: "#fff",
    }).textContent = `${!i ? "less than a year" : i}`;
  }
};
