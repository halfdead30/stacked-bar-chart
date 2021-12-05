import DataService from "./services/dataService.js";
import SpecService from "./services/specService.js";
import CitiesService from "./services/citiesService.js";
import { clearChart, generateCitiesList } from "./utils/helpers.js";
import { drawGraphCanvas } from "./views/canvas.js";
import { drawTolltip, generateTolltipInfo } from "./utils/tooltip.js";
import { generateBarText } from "./utils/generateBar.js";
import { createElementNS } from "./utils/createElementNS.js";
import { clearLegend, drawLegend } from "./utils/drawLegend.js";
import { generateTitle } from "./utils/generateTitle.js";
import { drawCanvasTitle } from "./utils/drawCanvasTitle.js";
import { getFilteredData } from "./utils/getFilteredData.js";
import { getStatistics } from "./utils/getStatistics.js";
import { calculateRate } from "./utils/calculateRate.js";
import { drawClipPath } from "./utils/drawClipPath.js";

const container = document.getElementById("container");
const citiesList = document.getElementById("cities");
const selector = document.getElementById("selector");
const selectAll = document.getElementById("select-all");

// Filters and filtered data
let filters = [];
let filteredData;

generateCitiesList(citiesList);

drawGraphCanvas(container);

// Canvas Elements
const gridLineGroup = document.querySelector(".gridline-group");
const svgCanvas = document.querySelector(".canvas");

drawCanvasTitle(svgCanvas, selector.value);

drawLegend(selector.value.toLowerCase());

const canvasWidth = +gridLineGroup.getAttributeNS(null, "width");
const barHeight = 642;

drawClipPath(svgCanvas, gridLineGroup);

export const barsArea = createElementNS("g", svgCanvas, {
  width: canvasWidth,
  height: barHeight,
  ["class"]: "bars-area",
});

const drawChart = (cities) => {
  getFilteredData(cities, selector)
    .then((data) => {
      filteredData = data;
    })
    .then(() => {
      const rate = calculateRate(getStatistics(filteredData));
      if (!rate.length) return;

      let actualHeight = 710;
      let stackIndex = rate[0].stack;

      for (let item of rate) {
        const { stack, height } = item;

        if (stackIndex === stack) {
          generateBarText(actualHeight, gridLineGroup, item);

          stackIndex = stack;
          actualHeight -= height;
        } else {
          stackIndex = stack;
          actualHeight = 710;

          generateBarText(actualHeight, gridLineGroup, item);

          actualHeight -= height;
        }
      }
    });
};

const selectAllCities = () => {
  SpecService.specialization().then(([data]) => {
    const checked = !!data.checkAll;
    selectAll.checked = checked;

    [...citiesList.children].forEach((item) => {
      item.firstChild.checked = !checked;
    });

    if (checked) {
      SpecService.checkAll(false);
      CitiesService.put(false);
      selectAll.checked = false;
      filters = [];
    } else {
      SpecService.checkAll(true);
      CitiesService.put(true);
      selectAll.checked = true;

      CitiesService.cities().then((data) => {
        filters = data.map(({ city_name }) => city_name);

        clearChart();
        drawChart(filters);
      });
    }

    clearChart();
  });
};

selectAll.addEventListener("click", () =>
  selectAllCities(selector.value, selectAll.checked)
);

citiesList.addEventListener("click", (e) => {
  const parent = e.target.closest("li");
  const text = parent.lastChild.textContent;
  const checkbox = parent.firstChild;

  if (parent) {
    checkbox.checked = !checkbox.checked;

    if (filters.includes(text)) {
      filters = filters.filter((city) => city !== text);
      clearChart();
    } else {
      filters = [...filters, text];
      clearChart();
    }
  }

  if (e.target.closest("label")) {
    e.preventDefault();
    checkbox.checked = checkbox.checked;
  }

  if (e.target.closest("input")) {
    checkbox.checked = !checkbox.checked;
  }

  const checkStatus = [...citiesList.children].some(
    (item) => !item.firstChild.checked
  );

  if (checkStatus) {
    selectAll.checked = !checkStatus;
    SpecService.checkAll(!checkStatus);
  } else {
    selectAll.checked = !checkStatus;
    SpecService.checkAll(!checkStatus);
  }

  DataService.put(text, checkbox.checked);

  drawChart(filters);
});

SpecService.specialization().then(([data]) => {
  selectAll.checked = !!data.checkAll;
});

CitiesService.cities().then((data) => {
  filters = data
    .filter((item) => !!item.checked)
    .map(({ city_name }) => city_name);
  clearChart();
  drawChart(filters);
});

selector.addEventListener("change", () => {
  const canvasTitle = document.querySelector(".canvas__title");
  const selected = selector.value;
  SpecService.put(selected);
  clearChart();

  CitiesService.cities().then((data) => {
    filters = data.map(({ city_name }) => city_name);
    drawChart(filters);
  });

  clearLegend();
  drawLegend(selected.toLowerCase());
  canvasTitle.textContent = generateTitle(selected);
});

// Tolltip
barsArea.addEventListener("mouseover", (e) => {
  const data = calculateRate(getStatistics(filteredData));
  const barGroup = e.target.closest(".bar-group");

  if (barGroup) {
    const id = +barGroup.dataset.id;
    const barInfo = data.find((item) => item.percent === id);
    const tolltipInfo = generateTolltipInfo(barInfo);
    drawTolltip(tolltipInfo, e);
  }
});

barsArea.addEventListener("mouseout", () => {
  const tolltip = document.querySelector(".tolltip");

  if (tolltip) {
    tolltip.remove();
  }
});
