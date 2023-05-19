/* FADEIN */
const fadeIn = (el, delay = 500, callback, display = 'block') => {
  el.style.opacity = 0;
  el.style.display = display;
  el.style.transition = `opacity ${delay}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
    callback && callback();
  }, delay);
};

/* FADEOUT */
const fadeOut = (el, delay = 500, callback) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${delay}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';

    callback && callback();
  }, delay);
};

export { fadeIn, fadeOut };
