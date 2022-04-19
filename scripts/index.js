import {FormValidator, config} from './validate.js';
import {initialCards, Card} from './card.js';
import {openPopup, closePopup} from './utils.js';

const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__sub-name');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_edit-profile');
const popupInputName = popupProfile.querySelector('.popup__input_content_name');
const popupInputSubName = popupProfile.querySelector('.popup__input_content_sub-name');
const popupButtonProfile = popupProfile.querySelector('.popup__button');

const popupCards = document.querySelector('.popup_cards-add');
const popupInputCardsName = popupCards.querySelector('.popup__input_cards_name');
const popupInputCardsLink = popupCards.querySelector('.popup__input_cards_link');
const popupFormCards = popupCards.querySelector('.popup__form_cards-add');
const popupButtonCards = popupCards.querySelector('.popup__button');

const elementsGrid = document.querySelector('.elements__grid');

const validateProfile = new FormValidator(config, popupProfile);
const validateCards = new FormValidator(config, popupCards);

validateProfile.enableValidation();
validateCards.enableValidation();

function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  closePopup(popupProfile);
}

function openProfilePopup() {
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
  openPopup(popupProfile);
  hideErrorInput(popupInputName);
  hideErrorInput(popupInputSubName);
}

function hideErrorInput(inputElement) {
  const errorElement = popupProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.spanError);
  errorElement.textContent = '';
}

function disableAddSubmitButton(buttonElement) {
  buttonElement.classList.remove('popup__button_valid');
  buttonElement.classList.add('popup__button_invalid');
  buttonElement.setAttribute('disabled', true);
}

function disableRemoveSubmitButton(buttonElement) {
  buttonElement.classList.add('popup__button_valid');
  buttonElement.classList.remove('popup__button_invalid');
  buttonElement.removeAttribute('disabled');
}

function createNewCard() {
  const newElement = {name : popupInputCardsName.value, link : popupInputCardsLink.value};
  const card = new Card(newElement, '.template-element');
  elementsGrid.prepend(card.renderCards());
  closePopup(popupCards);
  popupInputCardsName.value = '';
  popupInputCardsLink.value = '';
}

popupFormProfile.addEventListener('submit', savePopup);

buttonOpenPopupProfil.addEventListener('click', () => {
  openProfilePopup();
  disableRemoveSubmitButton(popupButtonProfile);
});

buttonOpenPopupCards.addEventListener('click', () => {
  openPopup(popupCards);
  disableAddSubmitButton(popupButtonCards);
});

popupFormCards.addEventListener('submit', createNewCard);

initialCards.forEach((item) => {
  const card = new Card(item, '.template-element');
  elementsGrid.prepend(card.renderCards());
});


