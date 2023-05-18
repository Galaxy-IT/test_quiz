const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    rect: rect,
    dom: {
      bottom: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    }
  };
};

const getNumbersFromString = (string) => {
  return string.replace(/D/g, '');
};

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export { getOffset, getNumbersFromString, getRndInteger };
