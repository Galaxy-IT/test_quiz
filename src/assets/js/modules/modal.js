export class Modal {
  constructor(options = {}) {
    if (options.modalSelector && options.triggerSelector) {
      this.modal = document.querySelectorAll(options.modalSelector) || null;
      this.trigger = document.querySelectorAll(options.triggerSelector) || null;
      this.closeBtn = options.closeSelector || null;
      this.modalActiveClass = options.modalActiveClass || 'show';
      this.scrollbarWidht = this.calcScroll();
      this.disableScrollbar = options.disableScrollbar !== undefined ? options.disableScrollbar : true;
      this.closeOnLightbox = options.closeOnLightbox !== undefined ? options.closeOnLightbox : true;
      this.closeOnEsc = options.closeOnEsc !== undefined ? options.closeOnEsc : true;
      this.bodyChangedWidth = false;
      this.on =
        {
          beforeInit: options.on && options.on.beforeInit ? options.on.beforeInit.bind(this.on) : null,
          init: options.on && options.on.init ? options.on.init.bind(this.on) : null,
          beforeOpen: options.on && options.on.beforeOpen ? options.on.beforeOpen.bind(this.on) : null,
          afterOpen: options.on && options.on.afterOpen ? options.on.afterOpen.bind(this.on) : null,
          beforeClose: options.on && options.on.beforeClose ? options.on.beforeClose.bind(this.on) : null,
          afterClose: options.on && options.on.afterClose ? options.on.afterClose.bind(this.on) : null
        } || {};
      if (this.modal.length && this.trigger.length) {
        this.init();
      }
    }
  }

  init = () => {
    this.on.beforeInit && this.on.beforeInit(this);
    this.trigger.forEach((btn) => btn.addEventListener('click', this.showModal));
    this.modal.forEach((modal) => {
      if (this.closeBtn) {
        modal.querySelectorAll(this.closeBtn).forEach((btn) => (btn.onclick = () => this.closeModal(modal)));
      }
      if (this.closeOnLightbox)
        modal.onclick = (e) => {
          if (e.target === modal) this.closeModal(modal);
        };
    });
    this.on.init && this.on.init(this);
  };

  showModal = (e) => {
    this.modal.forEach((modal) => {
      if (modal.id.toLowerCase() === e.currentTarget.dataset.modalTarget.toLowerCase()) {
        this.on.beforeOpen && this.on.beforeOpen(this, modal, e.currentTarget);
        modal.classList.add(this.modalActiveClass);
        this.disableScroll();
        if (this.closeOnEsc)
          window.onkeydown = (e) => {
            if (e.code === 'Escape') this.closeModal(modal);
          };
        this.on.afterOpen && this.on.afterOpen(this, modal, e.currentTarget);
      } else {
        if (modal.classList.contains(this.modalActiveClass)) {
          this.closeModal(modal, e.currentTarget);
        }
      }
    });
  };

  closeModal = (modal, trigger) => {
    this.on.beforeClose && this.on.beforeClose(this, modal, trigger);
    modal.classList.remove(this.modalActiveClass);
    this.enableScroll();
    this.on.afterClose && this.on.afterClose(this, modal, trigger);
  };

  disableScroll() {
    const body = document.body;
    body.style.overflow = 'hidden';
    if (Math.round(body.getBoundingClientRect().height) > window.innerHeight && this.disableScrollbar) {
      body.style.paddingRight = `${this.scrollbarWidht}px`;
      this.bodyChangedWidth = true;
    }
  }

  enableScroll() {
    const body = document.body;

    body.style.overflow = 'auto';
    if (this.bodyChangedWidth && this.disableScrollbar) {
      body.style.paddingRight = '0px';
      this.bodyChangedWidth = false;
    }
  }

  calcScroll() {
    let div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }
}
