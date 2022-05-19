import './index.css';
import { Api } from '../scripts/components/Api';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {PopupWithSubmit} from '../scripts/components/PopupWithSubmit';
import {initialCards,
  config,
  buttonOpenPopupProfil,
  buttonOpenPopupCards,
  buttonOpenPopupAvatar,
  popupProfile,
  popupCards,
  popupAvatar} from '../scripts/utils/constants.js';
let profileId = '';

const validateProfile = new FormValidator(config, popupProfile);
const validateCards = new FormValidator(config, popupCards);
const validateAvatar = new FormValidator(config, popupAvatar);

validateProfile.enableValidation();
validateCards.enableValidation();
validateAvatar.enableValidation();

const api = new Api();

api.getInitialProfile()
  .then((result) => {
    const name = document.querySelector('.profile__name');
    const about = document.querySelector('.profile__sub-name');
    const avatar = document.querySelector('.profile__avatar');
    name.textContent = result.name;
    about.textContent = result.about;
    avatar.src = result.avatar;
    profileId = result._id;
    return api.getInitialCard();
  }).then((result) => {
    result.forEach((item) => {
      initialCards.push(item);
      });

    const popupSaveProfile = new UserInfo('.profile__name', '.profile__sub-name');

    const popupEditProfile = new PopupWithForm({
      submitForm(evt){
        evt.preventDefault();
        popupEditAvatar.renderLoading(true);
        api.patchProfile(popupEditProfile.getInputValues())
        .then((result) => {
          popupSaveProfile.setUserInfo(result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false, 'Сохранить');
          popupEditProfile.close();
        });
      }},'.popup_edit-profile');
    popupEditProfile.setEventListeners();

    const popupCardAdd = new PopupWithForm({
      submitForm(evt){
        evt.preventDefault();
        popupCardAdd.renderLoading(true);
        api.addNewCard(popupCardAdd.getInputValues())
        .then((result) => {
          defaultCardList.renderItem(result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupCardAdd.renderLoading(false, 'Создать');
          popupCardAdd.close();
        });
    }},'.popup_cards-add');
    popupCardAdd.setEventListeners();

    const popupDeliteCard = new PopupWithSubmit({
      submitForm(evt){
        evt.preventDefault();
        popupDeliteCard.renderLoading(true);
        api.deliteCard(popupDeliteCard.getIdCard())
        .then((result) => {
          const element = popupDeliteCard.getCardElement();
          element.remove();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeliteCard.renderLoading(false, 'Да');
          popupDeliteCard.close();
        });
      }},'.popup-delite-card');
    popupDeliteCard.setEventListeners();

    const popupEditAvatar = new PopupWithForm({
      submitForm(evt){
        evt.preventDefault();
        popupEditAvatar.renderLoading(true);
        const avatar = document.querySelector('.profile__avatar');
        const linkAvatar = popupEditAvatar.getInputValues();
        api.patchAvatar(linkAvatar.link)
        .then((result) => {
          avatar.src = linkAvatar.link;
        }).catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false, 'Сохранить');
          popupEditAvatar.close();
        });
    }},'.popup-avatar');
    popupEditAvatar.setEventListeners();

    const cardClick = new PopupWithImage('.popup-image');
    cardClick.setEventListeners();

    const defaultCardList = new Section({
      data: initialCards,
      renderer: (item) => {
        const card = new Card({
          item,
          handleCardClick: () => {
            cardClick.open(item.name, item.link);
          },
          handleLikeClick: (evt) => {
            evt.target.classList.toggle('element__like_active');
            if (evt.target.classList.contains('element__like_active')) {
              api.addLike(item._id)
              .then((result) => {
                card.augmentNumberLike();
              })
              .catch((err) => {
                console.log(err);
              });
            } else {
              api.deliteLike(item._id)
              .then((result) => {
                card.subtractNumberLike();
              })
              .catch((err) => {
                console.log(err);
              });
            }
          },
          handleDeliteIconClick: (evt) => {
            popupDeliteCard.setCard(item, evt.target.closest('.element'));
            popupDeliteCard.open();
          }
          }, '.template-element');
        card.renderLike(profileId, item.likes);
        card.removeDeliteIcon(profileId, item.owner._id);
        const cardElement = card.renderCards();
        defaultCardList.setItem(cardElement);
      }
    }, '.elements__grid');

    buttonOpenPopupProfil.addEventListener('click', () => {
      validateProfile.resetValidation();
      popupEditProfile.setInputValues(popupSaveProfile.getUserInfo());
      popupEditProfile.open();
    });

    buttonOpenPopupCards.addEventListener('click', () => {
      validateCards.resetValidation();
      popupCardAdd.open();
    });

    buttonOpenPopupAvatar.addEventListener('click', () => {
      validateAvatar.resetValidation();
      popupEditAvatar.open();
    });

    defaultCardList.renderItems();
  }).catch((err) => {
    console.log(err);
});
