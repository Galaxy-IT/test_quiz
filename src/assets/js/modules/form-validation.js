export class FormValidation {
  constructor(options = {}) {
    if (options.formSelector) {
      // Foms elements collection
      this.formContainers = document.querySelectorAll(options.formSelector);

      // Selectors
      this.validationInputSelector = options.requiredSelector || '[data-required]';
      this.validationStatusTarget = options.validationStatusTarget || '[data-validation-status]';

      // Classes
      this.invalidClass = options.invalidClass || 'invalid';
      this.validClass = options.validClass || 'valid';

      // Bool
      this.inputFileValidate = options.inputFileValidate !== undefined ? options.inputFileValidate : true;

      // Input type rules
      this.inputName = {
        trim: options.inputName && options.inputName.trim !== undefined ? options.inputName.trim : true,
        regExp:
          options.inputName && options.inputName.regExp !== undefined
            ? options.inputName.regExp
            : /[^a-z A-Z а-я А-я Ї ї І і ]/g
      };

      this.inputTel = {
        trim: options.inputTel && options.inputTel.trim !== undefined ? options.inputTel.trim : true,
        regExp: options.inputTel && options.inputTel.regExp !== undefined ? options.inputTel.regExp : /[^0-9() +-]/g
      };

      this.inputNumber = {
        trim: options.inputNumber && options.inputNumber.trim !== undefined ? options.inputNumber.trim : true,
        regExp: options.inputNumber && options.inputNumber.regExp !== undefined ? options.inputNumber.regExp : /[^0-9]/g
      };

      this.inputMail = {
        validate: options.inputMail && options.inputMail.validate !== undefined ? options.inputMail.validate : true,
        regExp: options.inputMail && options.inputMail.regExp !== undefined ? options.inputMail.regExp : /\S+@\S+\.\S+/
      };

      // Binds methods
      this.on = {
        init: options.on && options.on.init ? options.on.init.bind(this.on) : null,
        input: options.on && options.on.input ? options.on.input.bind(this.on) : null,
        submit: options.on && options.on.submit ? options.on.submit.bind(this.on) : null
      };

      // Initialization
      const { formContainers, init } = this;
      formContainers.length && formContainers.forEach((form) => init(form));
    }
  }

  init = (form) => {
    // Input listener
    form.addEventListener('input', (event) => {
      const { target } = event;
      const validInput = this.inputHandle(target);

      if (validInput) {
        this.setInvalidClass(target.closest(this.validationStatusTarget), validInput);
      }

      this.on.input && this.on.input(event, this);
    });

    // Submit listener
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      const inputs = currentTarget.querySelectorAll(this.validationInputSelector);
      let validStatus = true;

      inputs.forEach((input) => {
        const inputStatus = this.submitHandle(input, event);
        if (!inputStatus) {
          validStatus = false;
        }
      });

      if (!validStatus) {
        event.preventDefault();
        return;
      }

      this.on.submit && this.on.submit(event, this);
      form.reset();
    });

    this.on.init && this.on.init(this, form);
  };

  inputHandle = (input) => {
    switch (input.dataset.validationType) {
      case 'email':
        return this.mailValidate(input);
      case 'tel':
        return this.telValidate(input);

      case 'number':
        return this.numberValidate(input);

      case 'empty':
        return this.emptyInputValidate(input);

      case 'name':
        return this.nameInputValidate(input);

      case 'checkbox':
        return this.checkboxValidate(input);

      case 'radio':
        return this.radioValidate(input.closest('[data-validation-type="radio-group"]'));

      case 'file':
        return this.fileValidate(input);
    }
  };

  submitHandle = (input) => {
    const { setInvalidClass } = this;

    switch (input.dataset.validationType) {
      case 'email':
        const mailStatus = this.mailValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), mailStatus);
        return mailStatus;

      case 'tel':
        const phoneStatus = this.telValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), phoneStatus);
        return phoneStatus;

      case 'number':
        const numberStatus = this.numberValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), numberStatus);
        return numberStatus;

      case 'empty':
        const emptyInputStatus = this.emptyInputValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), emptyInputStatus);
        return emptyInputStatus;

      case 'name':
        const nameInputStatus = this.nameInputValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), nameInputStatus);
        return nameInputStatus;

      case 'checkbox':
        const checkboxStatus = this.checkboxValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), checkboxStatus);
        return checkboxStatus;

      case 'radio-group':
        const radioStatus = this.radioValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), radioStatus);
        return radioStatus;

      case 'file':
        const fileStatus = this.fileValidate(input);
        setInvalidClass(input.closest(this.validationStatusTarget), fileStatus);
        return fileStatus;
    }
  };

  mailValidate = (input) => {
    if (!this.inputMail.validate) return input.value !== '';

    return this.inputMail.regExp.test(input.value);
  };

  checkboxValidate = (input) => input.checked;

  emptyInputValidate = (input) => input.value !== '';

  telValidate = (input) => {
    const { maxLength, value, minLength } = input;
    let telValid;
    if (this.inputTel.trim) input.value = value.replace(this.inputTel.regExp, '');

    if (maxLength >= 0 && minLength >= 0) {
      telValid = value.length <= +maxLength && value.length >= +minLength;
    } else if (maxLength >= 0) {
      telValid = value.length <= +maxLength && value !== '';
    } else if (minLength >= 0) {
      telValid = value.length >= +minLength;
    } else {
      telValid = value !== '';
    }

    return telValid;
  };

  nameInputValidate = (input) => {
    if (this.inputName.trim) input.value = input.value.replace(this.inputName.regExp, '');
    return input.value !== '';
  };

  radioValidate = (inputs) => {
    let radioChecked = false;

    inputs.querySelectorAll('input[type="radio"]').forEach((input) => {
      if (input.checked) radioChecked = true;
    });

    return radioChecked;
  };

  fileValidate = (input) => {
    const { files, accept } = input;
    if (!this.inputFileValidate) return input.value !== '';
    if (!input.accept) return input.value !== '';

    const fileTypes = accept.replace(/\,/g, '|\\');
    const fileTypesRegexp = new RegExp(`(${fileTypes})$`, 'i');
    const validFileType = files[0] ? fileTypesRegexp.test(files[0].name) : false;

    if (!validFileType) {
      input.value = '';
      this.setInvalidClass(input.closest(this.validationStatusTarget));
      return validFileType;
    }

    return validFileType;
  };

  setInvalidClass = (element, bool) => {
    const { invalidClass, validClass } = this;

    if (bool) {
      element.classList.remove(invalidClass);
      element.classList.add(validClass);
    } else {
      element.classList.remove(validClass);
      element.classList.add(invalidClass);
    }
  };

  numberValidate = (input) => {
    const { max, value, min } = input;
    const numberValid = +value <= +max && +value >= +min;

    if (this.inputNumber.trim) input.value = value.replace(this.inputNumber.regExp, '');

    this.setInvalidClass(input.closest(this.validationStatusTarget), numberValid);

    return numberValid;
  };
}
