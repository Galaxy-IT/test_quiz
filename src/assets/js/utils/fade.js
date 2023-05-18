/* FADEIN */
const fadeIn = (el, delay, display = 'block') => {
  el.style.opacity = 0;
  el.style.display = display;
  el.style.transition = `opacity ${delay}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, delay);
};

/* FADEOUT */
const fadeOut = (el, delay) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${delay}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, delay);
};

export {
  fadeIn,
  fadeOut
};
