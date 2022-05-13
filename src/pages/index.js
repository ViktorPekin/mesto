import './index.css';
import {FormValidator} from '../scripts/components/FormValidator.js';
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

fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
  headers: {
    authorization: '535d3a03-0687-4a91-b587-5369f637f559'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

const popupSaveProfile = new UserInfo('.profile__name', '.profile__sub-name');

const popupEditProfile = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    popupSaveProfile.setUserInfo(popupEditProfile.getInputValues());
    popupEditProfile.close();
  }},'.popup_edit-profile');
popupEditProfile.setEventListeners();

const popupCardAdd = new PopupWithForm({
  submitForm(evt){
    evt.preventDefault();
    defaultCardList.renderItem(popupCardAdd.getInputValues());
    popupCardAdd.close();
}},'.popup_cards-add');
popupCardAdd.setEventListeners();

const cardClick = new PopupWithImage('.popup-image');
cardClick.setEventListeners();

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: () => {
        cardClick.open(item.name, item.link);
      }
      }, '.template-element');
    const cardElement = card.renderCards();
    defaultCardList.setItem(cardElement);
  }
}, '.elements__grid');

defaultCardList.renderItems();

buttonOpenPopupProfil.addEventListener('click', () => {
  validateProfile.resetValidation();
  popupEditProfile.setInputValues(popupSaveProfile.getUserInfo());
  popupEditProfile.open();
});

buttonOpenPopupCards.addEventListener('click', () => {
  validateCards.resetValidation();
  popupCardAdd.open();
});
