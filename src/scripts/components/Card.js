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
    this._like = this._element.querySelector('.element__like');
    this._likeNumber = this._element.querySelector('.element__like-amount');
  }

  renderCards () {
    this._element.querySelector('.element__text').textContent = this._card.name;
    this._cardImage.src = this._card.link;
    this._cardImage.alt = this._card.name;
    this._renderLikeNumber();
    this._setEventListeners();
    return this._element;
  }

  _renderLikeNumber () {
    this._element.querySelector('.element__like-amount').textContent = this._card.likes.length;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);
    this._cardImage.addEventListener('click',this._handleCardClick);
  }

  _setEventDelite() {
    this._deliteIcon.addEventListener('click', this._handleDeliteIconClick);
  }

  renderLike(profileId, cardId) {
    cardId.forEach(item => {
      if(profileId === item._id) {
        this._like.classList.toggle('element__like_active');
      }
    });
  }

  augmentNumberLike() {
    this._likeNumber.textContent = Number(this._likeNumber.textContent) + 1;
  }

  subtractNumberLike() {
    this._likeNumber.textContent = Number(this._likeNumber.textContent) - 1;
  }

  removeDeliteIcon(profileId, cardId) {
    if(profileId !== cardId) {
      this._deliteIcon.remove();
    } else {
      this._setEventDelite();
    }
  }
}
