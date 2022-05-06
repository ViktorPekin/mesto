import {FormValidator} from './Validate.js';
import {Card} from './Card.js';
import {openPopup, closePopup} from './utils.js';
import {initialCards} from './initialCards.js';
import {config} from './config.js';

const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
const profileNames = document.querySelector('.profile__name');
const profileSubNames = document.querySelector('.profile__sub-name');

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

/* function saveDataPopupProfile(evt) {
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

popupFormCards.addEventListener('submit', createNewCard); */

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
    this._deliteEventListeners();
  }
  setEventListeners() {
    this._popupSelector.addEventListener('click',this._handleOverlayClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  _deliteEventListeners() {
    this._popupSelector.removeEventListener('click',this._handleOverlayClose.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
  constructor({submitForm}, popupSelector){
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(formValues) {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputList.forEach(input => {
      input.value = formValues[input.name];
    });
  }

  inputValues() {
    return this._getInputValues();
  }
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitForm);
  }
  close() {
    super.close();
    this._form.reset();
  }
}

class UserInfo {
  constructor(profileName, profileSubName) {
    this._profileName = document.querySelector(profileName);
    this._profileSubName = document.querySelector(profileSubName);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      subName: this._profileSubName.textContent
    };
  }

  setUserInfo({name, subName}) {
    this._profileName.textContent = name;
    this._profileSubName.textContent = subName;
  }
}

const popupSaveProfile = new UserInfo('.profile__name', '.profile__sub-name');

const popupEditProfile = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    popupSaveProfile.setUserInfo(popupEditProfile.inputValues());
    popupEditProfile.close();
  }},'.popup_edit-profile');

buttonOpenPopupProfil.addEventListener('click', () => {
  popupEditProfile.setInputValues(popupSaveProfile.getUserInfo());
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
  validateProfile.disabledButtonAdd(false);
});

const popupCardAdd = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    popupCardAdd.close();
}},'.popup_cards-add');

buttonOpenPopupCards.addEventListener('click', () => {
  popupCardAdd.open();
  popupCardAdd.setEventListeners();
  validateCards.disabledButtonAdd(true);
});

const cardClick = new PopupWithImage('.popup-image');

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: (evt) => {
        cardClick.open(evt);
        cardClick.setEventListeners();
      }
      }, '.template-element');
    const cardElement = card.renderCards();
    defaultCardList.setItem(cardElement);
  }
}, '.elements__grid');

defaultCardList.renderItems();


