export const columnScale = (stackIndex, columnWidth) => {
  const columnSpacing = columnWidth / 2;

  return columnSpacing / 2 + stackIndex * (columnWidth + columnSpacing);
};
