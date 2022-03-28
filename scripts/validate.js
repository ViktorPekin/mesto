function enableValidatuin(config) {
  const form = document.querySelector(config.form);

  form.addEventListener('input',(event) => handleFormInput(event, config));
}

function handleFormInput(event, config) {
  const form = event.currentTarget;
  const input = event.target;

  setError(input);
  disableButton(form, config);
}

function setError(input) {
  const span = document.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
}

function disableButton(form, config) {
  const valid = form.checkValidity();
  const button = form.querySelector(config.button);

  if (!valid) {
    button.classList.remove(config.buttonValid);
    button.classList.add(config.buttonInvalid);
    button.setAttribute('disabled', '');
  } else {
    button.classList.add(config.buttonValid);
    button.classList.remove(config.buttonInvalid);
    button.removeAttribute('disabled', '');
  }
}

enableValidatuin({
  form: '.popup__form[name="popup-form-profile"]',
  button: '.popup__button',
  buttonValid: 'popup__button_valid',
  buttonInvalid: 'popup__button_invalid'
});

enableValidatuin({
  form: '.popup__form[name="popup-form-link"]',
  button: '.popup__button',
  buttonValid: 'popup__button_valid',
  buttonInvalid: 'popup__button_invalid'
});
