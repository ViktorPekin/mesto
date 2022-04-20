export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.input));
    const buttonElement = this._formElement.querySelector(this._config.buttom);
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.spanError);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputError);
    errorElement.classList.remove(this._config.spanError);
    errorElement.textContent = '';
  }

  _disableAddFormSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._config.buttonValid);
    buttonElement.classList.add(this._config.buttonInvalid);
    buttonElement.setAttribute('disabled', true);
  }

  _disableRemoveFormSubmitButton(buttonElement) {
    buttonElement.classList.add(this._config.buttonValid);
    buttonElement.classList.remove(this._config.buttonInvalid);
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableAddFormSubmitButton(buttonElement);
    } else {
      this._disableRemoveFormSubmitButton(buttonElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
