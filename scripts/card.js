import {openPopup} from './utils.js';
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export class Card {
  constructor(card, template) {
    this._card = card;
    this._template = document.querySelector(template).content;
  }

  renderCards () {
    const element = this._template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__text').textContent = this._card.name;
    element.querySelector('.element__image').src = this._card.link;
    element.querySelector('.element__delite').addEventListener('click', this._deliteCards);
    element.querySelector('.element__like').addEventListener('click', this._toggleLikeCards);
    element.querySelector('.element__image').addEventListener('click', this._openPopupImage);
    return element;
  }

  _toggleLikeCards (evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deliteCards (evt) {
    const element = evt.currentTarget.closest('.element');
    element.remove();
  }

  _openPopupImage (evt) {
    const popupImage = document.querySelector('.popup-image');
    const popupImageImage = popupImage.querySelector('.popup-image__image');
    const popupImageTitle = popupImage.querySelector('.popup-image__title');
    openPopup(popupImage);
    popupImageImage.src = evt.target.src;
    popupImageTitle.textContent = evt.target.nextElementSibling.
    firstElementChild.textContent;
  }
}
