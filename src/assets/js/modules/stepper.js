import { fadeIn, fadeOut } from '../utils/fade';

export class Stepper {
  constructor() {
    this.$container = document.querySelector('.stepper');
    this.steps = this.$container.querySelectorAll('.step');
    this.$initBtn = this.$container.querySelector('.init-quiz');
    this.nextStepBtns = this.$container.querySelectorAll('.next-step');
    this.$prevStepBtn = this.$container.querySelector('.prev-step');
    this.duration = 250;
    this.locked = false;
    this.counter = {
      $container: this.$container.querySelector('.counter'),
      $current: this.$container.querySelector('.counter__current'),
      $total: this.$container.querySelector('.counter__total')
    };

    this.state = {
      currentStepCount: 0,
      $currentStep: this.steps[0],
      $nextStep: this.steps[1],
      $prevStep: null
    };
  }

  init() {
    if (!this.$container) return console.warn('Stepper: container is not defined');
    if (!this.steps.length) return console.warn('Stepper: steps is not defined');
    if (!this.$initBtn) return console.warn('Stepper: init button is not defined');

    this.$initBtn.addEventListener('click', this.start);

    this.nextStepBtns.length &&
      this.nextStepBtns.forEach(($btn) => $btn.addEventListener('click', () => this.changeStep()));

    this.$prevStepBtn.addEventListener('click', () => this.changeStep('prev'));
  }

  start = () => {
    this.counter.$container.classList.remove('hide');
    this.$prevStepBtn.classList.remove('hide');

    this.changeStep();
  };

  incStep() {
    this.state.currentStepCount++;

    if (this.state.currentStepCount >= this.steps.length) {
      this.state.currentStepCount = this.steps.length;
    }

    this.setNewStep();
  }

  decStep() {
    this.state.currentStepCount--;

    if (this.state.currentStepCount <= 0) {
      this.state.currentStepCount = 0;
    }

    this.setNewStep();
  }

  setNewStep() {
    this.state.prevStep = this.steps[this.state.currentStepCount - 1];
    this.state.$currentStep = this.steps[this.state.currentStepCount];
    this.state.$nextStep = this.steps[this.state.currentStepCount + 1];

    if (this.state.currentStepCount <= 0) {
      this.counter.$container.classList.add('hide');
      this.$prevStepBtn.classList.add('hide');
    }

    this.counter.$current.innerHTML = this.state.currentStepCount;
  }

  changeStep(direction = 'next') {
    if (this.locked) return;
    if(this.state.currentStepCount + 1 >= this.steps.length) return
    this.locked = true;

    fadeOut(this.state.$currentStep, this.duration, () => {
      direction === 'next' && this.incStep();
      direction === 'prev' && this.decStep();

      fadeIn(
        this.state.$currentStep,
        this.duration,
        () => {
          this.locked = false;
          console.log(this);
        },
        'flex'
      );
    });
  }

  checkStep() {
    const checkboxGroup = this.state.$currentStep
  }
}
