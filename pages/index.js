import {FormValidator} from '../scripts/components/Validate.js';
import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {initialCards,
  config,
  buttonOpenPopupProfil,
  buttonOpenPopupCards,
  popupProfile,
  popupCards} from '../scripts/utils/constants.js';

const validateProfile = new FormValidator(config, popupProfile);
const validateCards = new FormValidator(config, popupCards);

validateProfile.enableValidation();
validateCards.enableValidation();

const popupSaveProfile = new UserInfo('.profile__name', '.profile__sub-name');

const popupEditProfile = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    popupSaveProfile.setUserInfo(popupEditProfile.inputValues());
    popupEditProfile.close();
  }},'.popup_edit-profile');

const newCard = new Section({
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: (evt) => {
        cardClick.open(evt);
        cardClick.setEventListeners();
      }
      }, '.template-element');
    const cardElement = card.renderCards();
    newCard.setItem(cardElement);
  }
}, '.elements__grid');

const popupCardAdd = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    newCard.renderItem(popupCardAdd.inputValues());
    popupCardAdd.close();
}},'.popup_cards-add');

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

buttonOpenPopupProfil.addEventListener('click', () => {
  popupEditProfile.setInputValues(popupSaveProfile.getUserInfo());
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
  validateProfile.disabledButtonAdd(false);
});

buttonOpenPopupCards.addEventListener('click', () => {
  popupCardAdd.open();
  popupCardAdd.setEventListeners();
  validateCards.disabledButtonAdd(true);
});
