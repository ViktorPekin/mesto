import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({submitForm}, popupSelector){
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(formValues) {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputList.forEach(input => {
      input.value = formValues[input.name];
    });
  }

  inputValues() {
    return this._getInputValues();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }
  close() {
    super.close();
    this._form.reset();
  }
}
