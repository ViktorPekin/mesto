import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({submitForm}, popup){
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(formValues) {
    this._inputList.forEach(input => {
      input.value = formValues[input.name];
    });
  }

  getInputValues() {
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
