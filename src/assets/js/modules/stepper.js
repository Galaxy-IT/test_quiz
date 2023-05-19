import { fadeIn, fadeOut } from '../utils/fade';
import { slideDown, slideUp } from '../utils/slideIn';
import { canvasProgress } from './canvas-progress';

class CardSlider {
  constructor($container, stepper) {
    this.stepper = stepper;
    this.$container = $container;
    this.itemsWrap = this.$container.querySelector('.card-slider__items');
    this.clickedItemsWrap = this.$container.querySelector('.card-slider__items-hidden');
    this.items = this.$container.querySelectorAll('.card-slider__item');
    this.itemsNames = this.$container.querySelectorAll('.card-slider__items-name');
    this.buttons = this.$container.querySelectorAll('.card-slider__btn');
    this.isLocked = false;

    this.buttons.forEach(($btn) => {
      $btn.addEventListener('click', (event) => {
        this.choiceHandle(event);
      });
    });
  }

  reInit() {
    this.items = this.clickedItemsWrap.querySelectorAll('.card-slider__item');

    this.items[0].classList.add('active');
    this.itemsNames[0].classList.add('active');

    this.items.forEach(($item) => {
      this.itemsWrap.append($item);
    });
  }

  choiceHandle(event) {
    const { currentTarget: $btn } = event;
    if (this.isLocked) return;

    this.isLocked = true;

    const currentItemIndex = [...this.items].findIndex(($item) => $item.classList.contains('active'));
    const $currentItem = this.items[currentItemIndex];
    const $currentItemName = this.itemsNames[currentItemIndex];
    const $nextItem = this.items[currentItemIndex + 1];
    const $nextItemName = this.itemsNames[currentItemIndex + 1];

    const $currentItemInput = $currentItem.querySelector('.card-slider-item-input');

    if ($btn.classList.contains('left')) {
      $currentItem.classList.add('to-left');
      $currentItemName.classList.add('to-left');
    } else if ($btn.classList.contains('center')) {
      $currentItem.classList.add('to-fade');
      $currentItemName.classList.add('to-fade');
    } else if ($btn.classList.contains('right')) {
      $currentItem.classList.add('to-right');
      $currentItemName.classList.add('to-right');
    }

    if ($currentItemInput) {
      $currentItemInput.value = $btn.dataset?.value || '';
    }

    if ($nextItem) {
      $nextItem.classList.add('active');
      $nextItemName.classList.add('active');
    } else {
      this.stepper.changeStep();
    }

    setTimeout(() => {
      $currentItem.classList.remove('to-left');
      $currentItemName.classList.remove('to-left');
      $currentItem.classList.remove('to-fade');
      $currentItemName.classList.remove('to-fade');
      $currentItem.classList.remove('to-right');
      $currentItemName.classList.remove('to-right');
      $currentItem.classList.remove('active');
      $currentItemName.classList.remove('active');
      this.clickedItemsWrap.append($currentItem);

      if (!$nextItem) {
        this.reInit();
      }
      this.isLocked = false;
    }, this.stepper.duration * 2);
  }
}

export class Stepper {
  constructor() {
    this.$section = document.querySelector('.stepper');
    this.$container = this.$section.querySelector('.stepper__container');
    this.$progress = this.$section.querySelector('.stepper__progress');
    this.steps = this.$container.querySelectorAll('.step');
    this.$initBtn = this.$container.querySelector('.init-quiz');
    this.nextStepBtns = this.$container.querySelectorAll('.next-step');
    this.$prevStepBtn = this.$container.querySelector('.prev-step');
    this.duration = 250;
    this.locked = false;
    this.checkboxes = this.$container.querySelectorAll('.checkbox');
    this.cardSliders = this.$container.querySelectorAll('.card-slider');
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

    if (this.counter.$total) {
      this.counter.$total.innerHTML = this.steps.length - 1;
    }

    this.$initBtn.addEventListener('click', this.start);
    this.$prevStepBtn.addEventListener('click', () => {
      this.changeStep('prev');
    });

    this.nextStepBtns.length &&
      this.nextStepBtns.forEach(($btn) => $btn.addEventListener('click', () => this.changeStep()));

    this.checkboxes.length &&
      this.checkboxes.forEach(($currentCheckbox) =>
        $currentCheckbox.addEventListener('change', ({ currentTarget }) => {
          const $container = currentTarget.closest('.checkbox-group');
          const checkboxes = $container.querySelectorAll('.checkbox');
          const $resetCheckboxes = $container.querySelector('.reset-checkboxes');

          if (currentTarget === $resetCheckboxes) {
            checkboxes.length &&
              checkboxes.forEach(($checkbox) => {
                if (currentTarget !== $checkbox) {
                  $checkbox.checked = false;
                }
              });
          } else {
            $resetCheckboxes.checked = false;
          }
        })
      );

    this.cardSliders.length && this.cardSliders.forEach(($cardSlider) => new CardSlider($cardSlider, this));
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
    if (direction === 'next' && this.state.currentStepCount + 1 >= this.steps.length) return;
    if (direction === 'prev' && this.state.currentStepCount <= 0) return;
    this.locked = true;

    let isValid = true;

    this.checkStep().forEach((bool) => {
      if (!bool && direction === 'next') {
        isValid = false;
      }
    });

    if (isValid) {
      fadeOut(this.state.$currentStep, this.duration, () => {
        direction === 'next' && this.incStep();
        direction === 'prev' && this.decStep();
        this.$progress.style.width = `${(this.state.currentStepCount / this.steps.length) * 100}%`;
        this.state.$currentStep.classList.remove('active');

        fadeIn(
          this.state.$currentStep,
          this.duration,
          async () => {
            this.state.$currentStep.classList.add('active');
            const canvas = this.state.$currentStep.querySelector('.step__canvas');

            canvas &&
              (await canvasProgress(canvas.id, () => {
                const parent = canvas.closest('.step__canvas-wrap');
                parent.classList.add('complete');

                setTimeout(() => {
                  this.changeStep();
                }, this.duration * 2);
              }));

            this.locked = false;
          },
          'flex'
        );
      });
    } else {
      this.state.$currentStep.classList.add('invalid');

      setTimeout(() => {
        this.state.$currentStep.classList.remove('invalid');
        this.locked = false;
      }, this.duration * 2);
    }
  }

  checkboxGroupHandle() {
    const checkboxGroup = this.state.$currentStep.querySelector('.checkbox-group');
    if (!checkboxGroup) return true;

    const checkboxes = checkboxGroup.querySelectorAll('.checkbox');
    if (!checkboxes.length) return true;

    return Boolean([...checkboxes].find(($checkbox) => $checkbox.checked));
  }

  checkStep() {
    const isValidObj = {};
    isValidObj.isCheckboxGroupValid = this.checkboxGroupHandle();

    const isAllValid = Object.values(isValidObj);

    return new Set(isAllValid);
  }
}
