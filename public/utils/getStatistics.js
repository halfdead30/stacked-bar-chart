import { calculatePercentile } from "./calculatePercentile.js";
import { stackClasses, stackClassPosition } from "./stackClassPosition.js";

export const getStatistics = (filteredData) => {
  return Object.entries(filteredData)
    .reduce((acc, [exp, data]) => {
      return acc.concat(
        Object.entries(data).map(([spec, salaries]) => {
          const numbers = [...salaries].sort((a, b) => a - b);
          const total = salaries.reduce((acc, curr) => (acc += curr), 0);

          return {
            label: spec,
            stackName: stackClassPosition(spec),
            stack: exp,
            min: Math.min(...numbers),
            max: Math.max(...numbers),
            quartile10: calculatePercentile(0.1, numbers),
            quartile25: calculatePercentile(0.25, numbers),
            quartile75: calculatePercentile(0.75, numbers),
            quartile90: calculatePercentile(0.9, numbers),
            median: calculatePercentile(0.5, numbers),
            mean: Math.round(total / numbers.length),
            total,
            quantity: numbers.length,
          };
        })
      );
    }, [])
    .sort((a, b) => {
      if (a.stack === b.stack) {
        return (
          stackClasses.indexOf(a.stackName) - stackClasses.indexOf(b.stackName)
        );
      }
    });
};
