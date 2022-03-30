const config = {
  form: '.popup__form',
  input: '.popup__input',
  buttom: '.popup__button',
  inputError: 'popup__input_type_error',
  spanError: 'popup__input-error',
  buttonValid: 'popup__button_valid',
  buttonInvalid: 'popup__button_invalid',
  formCardAdd: 'popup__form_cards-add'
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.input));
  const buttonElement = formElement.querySelector(config.buttom);

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.spanError);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.spanError);
  errorElement.textContent = '';
}

function disableAddFormSubmitButton(buttonElement, config) {
  buttonElement.classList.remove(config.buttonValid);
  buttonElement.classList.add(config.buttonInvalid);
  buttonElement.setAttribute('disabled', true);
}

function disableRemoveFormSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.buttonValid);
  buttonElement.classList.remove(config.buttonInvalid);
  buttonElement.removeAttribute('disabled');
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableAddFormSubmitButton(buttonElement, config);
  } else {
    disableRemoveFormSubmitButton(buttonElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

enableValidation(config);
