import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }
  open(evt) {
    const popupImage = document.querySelector('.popup-image');
    const popupImageImage = popupImage.querySelector('.popup-image__image');
    const popupImageTitle = popupImage.querySelector('.popup-image__title');
    popupImageImage.src = evt.target.src;
    popupImageImage.alt = evt.target.nextElementSibling.
    firstElementChild.textContent;
    popupImageTitle.textContent = evt.target.nextElementSibling.
    firstElementChild.textContent;
    super.open();
  }
}
