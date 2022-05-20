export class Card {
  constructor({item, userData, handleCardClick, addLikeClick, removeLikeClick, handleDeliteIconClick}, selectorTemplate) {
    this._card = item;
    this._profileId = userData._id;
    this._template = document.querySelector(selectorTemplate).content;
    this._handleCardClick = handleCardClick;
    this._handleDeliteIconClick = handleDeliteIconClick;
    this._addLikeClick = addLikeClick;
    this._removeLikeClick = removeLikeClick;
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
    this._renderLike();
    this._renderLikeNumber();
    this._removeDeliteIcon();
    this._setEventListeners();
    return this._element;
  }

  _renderLikeNumber () {
    this._likeNumber.textContent = this._card.likes.length;
  }

  _setEventListeners() {
    this._like.addEventListener('click',(evt) => {
      this._handleLikeClick(this);
    });
    this._cardImage.addEventListener('click',this._handleCardClick);
  }

  _setEventDelite() {
    this._deliteIcon.addEventListener('click', this._handleDeliteIconClick);
  }

  _handleLikeClick() {
    if (!this._like.classList.contains('element__like_active')) {
      this._addLikeClick();
    } else {
      this._removeLikeClick();
    }
  }

  toggleLike() {
    this._like.classList.toggle('element__like_active');
  }

  _renderLike() {
    this._card.likes.forEach(item => {
      if(this._profileId === item._id) {
        this.toggleLike();
      }
    });
  }

  renderNumberLike(item) {
    this._likeNumber.textContent = item.likes.length;
  }

  _removeDeliteIcon() {
    if(this._profileId !== this._card.owner._id) {
      this._deliteIcon.remove();
    } else {
      this._setEventDelite();
    }
  }
}
