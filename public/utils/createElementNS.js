const setAttributes = (element, ...attributes) => {
  attributes.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      element.setAttributeNS(null, key, value);
    });
  });
};

export const createElementNS = (tagName, parentNode, ...attributes) => {
  const namespaceURI = "http://www.w3.org/2000/svg";
  const element = document.createElementNS(namespaceURI, tagName);
  parentNode.appendChild(element);

  if (attributes.length) {
    setAttributes(element, ...attributes);
  }

  return element;
};
