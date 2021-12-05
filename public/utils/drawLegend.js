import { createElementNS } from "./createElementNS.js";
import { stackClasses } from "./stackClassPosition.js";

export const drawLegend = (selectedVal) => {
  const svgCanvas = document.querySelector(".canvas");
  const legendGroup = createElementNS("g", svgCanvas, {
    ["class"]: "footer-group",
  });

  let step = 20;

  const legendInfo = {
    javascript: [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Team/Technical Lead",
      "System Architect",
    ],
    java: [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Team/Technical Lead",
      "System Architect",
    ],
    qa: [
      "Junior QA engineer",
      "QA Engineer",
      "Senior QA engineer",
      "QA Tech Lead",
      "QA Manager",
    ],
  };

  const selected = selectedVal.includes("qa") ? "qa" : selectedVal;

  legendInfo[selected].forEach((item, i) => {
    const legendGroupItem = createElementNS("g", legendGroup);

    createElementNS("rect", legendGroupItem, {
      width: "20",
      height: "20",
      x: step,
      y: "750",
      rx: "5",
      ry: "5",
      ["class"]: stackClasses[i],
    });

    createElementNS("text", legendGroupItem, {
      x: `${30 + step}`,
      y: "765",
      fill: "#fff",
      ["class"]: "footer-group__spec",
    }).textContent = item;

    step += 210;
  });
};

export const clearLegend = () => {
  const footerGroup = document.querySelector(".footer-group");
  footerGroup.remove();
};
