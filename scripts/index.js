import {FormValidator} from './Validate.js';
import {Card} from './Card.js';
import {openPopup, closePopup} from './utils.js';
import {initialCards} from './initialCards.js';
import {config} from './config.js';

const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__sub-name');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_edit-profile');
const popupInputName = popupProfile.querySelector('.popup__input_content_name');
const popupInputSubName = popupProfile.querySelector('.popup__input_content_sub-name');

const popupCards = document.querySelector('.popup_cards-add');
const popupInputCardsName = popupCards.querySelector('.popup__input_cards_name');
const popupInputCardsLink = popupCards.querySelector('.popup__input_cards_link');
const popupFormCards = popupCards.querySelector('.popup__form_cards-add');

const elementsGrid = document.querySelector('.elements__grid');

const validateProfile = new FormValidator(config, popupProfile);
const validateCards = new FormValidator(config, popupCards);

validateProfile.enableValidation();
validateCards.enableValidation();

function saveDataPopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  closePopup(popupProfile);
}

function openProfilePopup() {
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
  openPopup(popupProfile);
  validateProfile.resetErrors();
}

function openCardsPopup() {
  openPopup(popupCards);
  validateCards.resetErrors();
}

function createNewCard() {
  const newElement = {name : popupInputCardsName.value, link : popupInputCardsLink.value};
  const card = new Card(newElement, '.template-element');
  elementsGrid.prepend(card.renderCards());
  closePopup(popupCards);
  popupInputCardsName.value = '';
  popupInputCardsLink.value = '';
}

popupFormProfile.addEventListener('submit', saveDataPopupProfile);

buttonOpenPopupProfil.addEventListener('click', () => {
  openProfilePopup();
  validateProfile.disabledButtonAdd(false);
});

buttonOpenPopupCards.addEventListener('click', () => {
  openCardsPopup();
  validateCards.disabledButtonAdd(true);
});

popupFormCards.addEventListener('submit', createNewCard);

/* initialCards.forEach((item) => {
  const card = new Card(item, '.template-element');
  elementsGrid.prepend(card.renderCards());
}); */

class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}

class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(event) {
    const activePopup = document.querySelector('.popup_opened');

    if (event.key === 'Escape') {
      this.close(activePopup);
    }
  }
  setEventListeners(evt) {
    const activePopup = document.querySelector('.popup_opened');

    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close(activePopup);
    }
  }
}

class PopupWithImage extends Popup {
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

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const input = this._popupSelector.querySelectorAll('.popup__input');
  }

  setEventListeners(event) {
    super.setEventListeners();
    //
  }
  close() {
    super.close();
    //
  }
}
const cardClick = new PopupWithImage('.popup-image');
cardClick.setEventListeners(evt);

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: (evt) => {
        cardClick.open(evt);

        console.log("11");
      }
      }, '.template-element');
    const cardElement = card.renderCards();
    defaultCardList.setItem(cardElement);
    //card.cardClick();
  }
}, '.elements__grid');

defaultCardList.renderItems();

class UserInfo {
  constructor({profileName, profileSubName}) {
    this._profileName = profileName;
    this._profileSubName = profileSubName;
  }

  getUserInfo() {
    popupInputName.value = this._profileName.textContent;
    popupInputSubName.value =this. _profileSubName.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = popupInputName.value;
    this._profileSubName.textContent = popupInputSubName.value;
  }
}

