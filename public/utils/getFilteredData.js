import CitiesService from "../services/citiesService.js";
import DataService from "../services/dataService.js";
import SpecService from "../services/specService.js";

export const getFilteredData = async (filters, selector) => {
  const data = await DataService.list(selector.value);

  return data
    .filter(({ _, city }) => filters.some((filter) => city === filter))
    .reduce((acc, { salary, post, exp }) => {
      const calcExp = exp < 1 ? 0 : exp;

      if (!acc[calcExp]) acc[calcExp] = { [post]: [] };

      return {
        ...acc,
        [calcExp]: {
          ...acc[calcExp],
          [post]: [...(acc[calcExp][post] || []), salary],
        },
      };
    }, {});
};
