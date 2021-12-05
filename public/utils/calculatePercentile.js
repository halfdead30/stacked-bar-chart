export const calculatePercentile = (percent, numbers) => {
  if (numbers.length < 2) return "";

  const point = percent * (numbers.length - 1) + 1;
  const fraction = point - Math.floor(point);
  const prevNumber = numbers[Math.floor(point) - 1];
  const nextNumber = numbers[Math.floor(point)];

  return Math.floor(prevNumber + fraction * (nextNumber - prevNumber));
};
