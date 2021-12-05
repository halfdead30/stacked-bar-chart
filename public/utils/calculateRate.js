export const calculateRate = (data) => {
  const dataLength = data.length || 0;

  const totals = [...new Array(dataLength)].map(() => {
    return data.reduce((acc, curr) => {
      const key = curr.stack;

      return {
        ...acc,
        [key]: (acc[key] || 0) + curr.quantity,
      };
    }, {});
  });

  return data.map((item, i) => {
    const total = totals[i][item.stack];
    const dataValue = item.quantity;
    const percent = dataValue / total;
    const height = 642 * percent;
    return { ...item, height, percent };
  });
};
