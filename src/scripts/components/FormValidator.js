export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.input));
    this._buttonElement = this._formElement.querySelector(this._config.buttom);
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
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

  _disableButton(buttonElement) {
    buttonElement.classList.remove(this._config.buttonValid);
    buttonElement.classList.add(this._config.buttonInvalid);
    buttonElement.setAttribute('disabled', true);
  }

  _activateButton(buttonElement) {
    buttonElement.classList.add(this._config.buttonValid);
    buttonElement.classList.remove(this._config.buttonInvalid);
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._activateButton(buttonElement);
    }
  }

  _hasInvalidInput(_inputList) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
