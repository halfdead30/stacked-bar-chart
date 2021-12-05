import { createElementNS } from "./createElementNS.js";

export const generateTolltipInfo = ({
  min,
  max,
  quartile10,
  quartile25,
  quartile75,
  quartile90,
  quantity,
  median,
  mean,
}) => {
  return [
    `Min: ${min}$`,
    `10th Quartile: ${quartile10 ? `${quartile10}$` : ""}`,
    `25th Quartile: ${quartile25 ? `${quartile25}$` : ""}`,
    `75th Quartile: ${quartile75 ? `${quartile75}$` : ""}`,
    `Median: ${median ? `${median}$` : ""}`,
    `Mean: ${mean ? `${mean}$` : ""}`,
    `90th Quartile: ${quartile90 ? `${quartile90}$` : ""}`,
    `Max: ${max ? `${max}$` : ""}`,
    `::::::::::::::`,
    `Number: ${quantity}`,
  ];
};

export const drawTolltip = (data, e) => {
  const container = document.getElementById("container");
  const { right, top, height } = e.target.getBoundingClientRect();

  const tolltipContainer = createElementNS("svg", container, {
    width: "125",
    height: "165",
    viewBox: "0 0 125 165",
    ["class"]: "tolltip",
    style: `position: absolute; left: ${right - 10}px; top: ${
      top + height / 2
    }px`,
  });

  const tolltipGroup = createElementNS("g", tolltipContainer);

  createElementNS("rect", tolltipGroup, {
    width: "125",
    height: "165",
    x: "0",
    y: "0",
    fill: "#dce2e7",
  });

  let step = 16;

  data.forEach((item) => {
    createElementNS("text", tolltipGroup, {
      x: "5",
      y: `${step}`,
    }).appendChild(document.createTextNode(item));

    step += 16;
  });
};
