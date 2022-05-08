import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup){
    super(popup);
  }
  open(name, link) {
    const popupImageImage = this._popup.querySelector('.popup-image__image');
    const popupImageTitle = this._popup.querySelector('.popup-image__title');
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageTitle.textContent = name;
    super.open();
  }
}
