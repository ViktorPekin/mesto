export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._deliteEventListeners();
  }
  setEventListeners() {
    this._popupSelector.addEventListener('click',this._handleOverlayClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  _deliteEventListeners() {
    this._popupSelector.removeEventListener('click',this._handleOverlayClose.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    this.close();
    }
  }
}
