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

initialCards.forEach((item) => {
  const card = new Card(item, '.template-element');
  elementsGrid.prepend(card.renderCards());
});


