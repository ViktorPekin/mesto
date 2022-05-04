import {openPopup} from './utils.js';

export class Card {
  constructor({item, handleCardClick}, selectorTemplate) {
    this._card = item;
    this._template = document.querySelector(selectorTemplate).content;
    this._handleCardClick = handleCardClick;
  }

  renderCards () {
    const element = this._getTemplate();
    element.querySelector('.element__text').textContent = this._card.name;
    element.querySelector('.element__image').src = this._card.link;
    element.querySelector('.element__image').alt = this._card.name;
    element.querySelector('.element__delite').addEventListener('click', this._deliteCards);
    element.querySelector('.element__like').addEventListener('click', this._toggleLikeCards);
    //element.querySelector('.element__image').addEventListener('click', this._openPopupImage);
    return element;
  }

  _getTemplate() {
    return this._template.querySelector('.element').cloneNode(true);
  }

  _toggleLikeCards (evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deliteCards (evt) {
    const element = evt.currentTarget.closest('.element');
    element.remove();
  }

  cardClick() {
    const element = this._getTemplate();
    //this._handleCardClick();
    element.querySelector('.element__image').addEventListener('click',(evt) => this._handleCardClick(evt));
  }
  /* _openPopupImage (evt) {
    const popupImage = document.querySelector('.popup-image');
    const popupImageImage = popupImage.querySelector('.popup-image__image');
    const popupImageTitle = popupImage.querySelector('.popup-image__title');
    openPopup(popupImage);
    popupImageImage.src = evt.target.src;
    popupImageImage.alt = evt.target.nextElementSibling.
    firstElementChild.textContent;
    popupImageTitle.textContent = evt.target.nextElementSibling.
    firstElementChild.textContent;
  } */
}
