export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._button = this._popup.querySelector('.popup__button');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popup.addEventListener('mousedown',this._handleOverlayClose.bind(this));
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
  renderLoading(isLoading, defaultText) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = defaultText;
    }
  }
}
