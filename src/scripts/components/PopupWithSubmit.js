import { Popup } from "./Popup";
export class PopupWithSubmit extends Popup {
  constructor({submitForm}, popup){
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._id = '';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  setIdCard(id) {
    this._id = id;
  }

  getIdCard() {
    return this._id;
  }
}
