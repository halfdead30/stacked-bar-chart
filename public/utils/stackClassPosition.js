export const stackClasses = [
  "junior",
  "engineer",
  "senior",
  "lead",
  "architect",
  "manager",
];

export const stackClassPosition = (label) => {
  const lowerCase = label.toLowerCase();
  const stackClass = stackClasses
    .filter((item) => item !== "engineer")
    .find((item) => lowerCase.includes(item));
  return stackClass || "engineer";
};
