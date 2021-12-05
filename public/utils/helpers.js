import { barsArea } from "../script.js";
import CitiesService from "../services/citiesService.js";

export const generateCitiesList = (list) => {
  CitiesService.cities().then((data) => {
    data.forEach(({ city_name, checked }) => {
      const cityCheckbox = document.createElement("input");
      const cityLabel = document.createElement("label");
      const cityLink = document.createElement("li");

      cityLink.classList.add("cities__item");
      cityLabel.classList.add("cities__item-label");

      cityLabel.textContent = `${city_name}`;
      cityCheckbox.type = "checkbox";
      cityCheckbox.checked = !!checked;

      cityLink.prepend(cityCheckbox, cityLabel);
      list.append(cityLink);
    });
  });
};

export const clearChart = () =>
  [...barsArea.children].forEach((bar) => bar.remove());
