export class Card {
  constructor({item, handleCardClick, handleLikeClick, handleDeliteIconClick}, selectorTemplate) {
    this._card = item;
    this._template = document.querySelector(selectorTemplate).content;
    this._handleCardClick = handleCardClick;
    this._handleDeliteIconClick = handleDeliteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._template.querySelector('.element').cloneNode(true);
    this._cardImage = this._element.querySelector('.element__image');
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
    //this._element.querySelector('.element__delite').addEventListener('click', this._handleDeliteIconClick);
    this._element.querySelector('.element__like').addEventListener('click', this._toggleLikeCards);
    this._cardImage.addEventListener('click',this._handleCardClick);
  }

  removeDeliteIcon(profileId, cardId, item) {

    if(profileId !== cardId) {
      console.log(item);
      console.log(this._element);
/*       const e = this._element.querySelector('.element__delite');
      e.remove(); */
    }
  }

  _toggleLikeCards (evt) {
    _handleLikeClick();
    evt.target.classList.toggle('element__like_active');
  }

  _deliteCards (evt) {
    const element = evt.currentTarget.closest('.element');
    element.remove();
  }
}
