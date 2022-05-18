import { Popup } from "./Popup";
export class PopupWithSubmit extends Popup {
  constructor({submitForm}, popup){
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._id = '';
    this._card = '';
    this._cardElement = '';
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  setCard(card, element) {
    this._id = card._id;
    this._card = card;
    this._cardElement = element;
  }

  getCardElement() {
    return this._cardElement;
  }

  getCard() {
    return this._card;
  }

  getIdCard() {
    return this._id;
  }
}
