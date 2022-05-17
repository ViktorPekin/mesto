export class Card {
  constructor({item, handleCardClick, handleLikeClick, handleDeliteIconClick}, selectorTemplate) {
    this._card = item;
    this._template = document.querySelector(selectorTemplate).content;
    this._handleCardClick = handleCardClick;
    this._handleDeliteIconClick = handleDeliteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._template.querySelector('.element').cloneNode(true);
    this._cardImage = this._element.querySelector('.element__image');
    this._deliteIcon = this._element.querySelector('.element__delite');
  }

  renderCards () {
    this._element.querySelector('.element__text').textContent = this._card.name;
    this._element.querySelector('.element__like-amount').textContent = this._card.likes.length;
    this._cardImage.src = this._card.link;
    this._cardImage.alt = this._card.name;
    this.removeDeliteIcon();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._toggleLikeCards);
    this._cardImage.addEventListener('click',this._handleCardClick);
  }

  _setEventDelite() {
    this._deliteIcon.addEventListener('click', this._handleDeliteIconClick);
  }

  removeDeliteIcon(profileId, cardId) {
    if(profileId !== cardId) {
      this._deliteIcon.remove();
    } else {
      this._setEventDelite();
    }
  }

  _toggleLikeCards (evt) {
    _handleLikeClick();
    evt.target.classList.toggle('element__like_active');
  }

  deliteCards (evt) {
    const element = evt.currentTarget.closest('.element');
    element.remove();
  }
}
