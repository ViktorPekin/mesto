import { Popup } from "./Popup";
export class PopupWithSubmit extends Popup {
  constructor({submitForm}, popup){
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }
}
