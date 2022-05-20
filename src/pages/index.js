import './index.css';
import { Api } from '../scripts/components/Api';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {PopupWithSubmit} from '../scripts/components/PopupWithSubmit';
import {config,
  buttonOpenPopupProfil,
  buttonOpenPopupCards,
  buttonOpenPopupAvatar,
  popupProfile,
  popupCards,
  popupAvatar} from '../scripts/utils/constants.js';

const validateProfile = new FormValidator(config, popupProfile);
const validateCards = new FormValidator(config, popupCards);
const validateAvatar = new FormValidator(config, popupAvatar);

validateProfile.enableValidation();
validateCards.enableValidation();
validateAvatar.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '535d3a03-0687-4a91-b587-5369f637f559',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialProfile(), api.getInitialCard()])
.then((res) => {
  return res;
})
.then(([userData, cards]) => {

  const popupSaveProfile = new UserInfo('.profile__name',
  '.profile__sub-name', '.profile__avatar', userData);
  popupSaveProfile.renderInfo();

  const popupEditProfile = new PopupWithForm({
    submitForm(evt){
      evt.preventDefault();
      popupEditProfile.renderLoading(true);
      api.patchProfile(popupEditProfile.getInputValues())
      .then((result) => {
        popupSaveProfile.setUserInfo(result);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false, 'Сохранить');
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
        popupCardAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCardAdd.renderLoading(false, 'Создать');
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
        popupDeliteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeliteCard.renderLoading(false, 'Да');
      });
    }},'.popup-delite-card');
  popupDeliteCard.setEventListeners();

  const popupEditAvatar = new PopupWithForm({
    submitForm(evt){
      evt.preventDefault();
      popupEditAvatar.renderLoading(true);
      api.patchAvatar(popupEditAvatar.getInputValues().link)
      .then((result) => {
        popupSaveProfile.removeAvatar(result.avatar);
        popupEditAvatar.close();
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false, 'Сохранить');
      });
  }},'.popup-avatar');
  popupEditAvatar.setEventListeners();

  const cardClick = new PopupWithImage('.popup-image');
  cardClick.setEventListeners();

  const defaultCardList = new Section({
    data: cards,
    renderer: (item) => {
      const card = new Card({
        item,
        userData,
        handleCardClick: () => {
          cardClick.open(item.name, item.link);
        },
        addLikeClick: () => {
          api.addLike(item._id)
          .then((result) => {
            card.toggleLike();
            card.renderNumberLike(result);
          })
          .catch((err) => {
            console.log(err);
          });
        },
        removeLikeClick: () => {
          api.deliteLike(item._id)
          .then((result) => {
            card.toggleLike();
            card.renderNumberLike(result);
          })
          .catch((err) => {
            console.log(err);
          });
        },
        handleDeliteIconClick: (evt) => {
          popupDeliteCard.setCard(item, evt.target.closest('.element'));
          popupDeliteCard.open();
        }
        }, '.template-element');
      const cardElement = card.renderCards();
      defaultCardList.setItem(cardElement);
    }
  }, '.elements__grid');

  buttonOpenPopupProfil.addEventListener('click', () => {
    popupEditProfile.setInputValues(popupSaveProfile.getUserInfo());
    validateProfile.resetValidation();
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
})
.catch((err) => {
  console.log(err);
});

/* api.getInitialProfile()
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
    const popupSaveProfile = new UserInfo('.profile__name', '.profile__sub-name');

    const popupEditProfile = new PopupWithForm({
      submitForm(evt){
        evt.preventDefault();
        popupEditAvatar.renderLoading(true);
        api.patchProfile(popupEditProfile.getInputValues())
        .then((result) => {
          popupSaveProfile.setUserInfo(result);
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false, 'Сохранить');
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
          popupCardAdd.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupCardAdd.renderLoading(false, 'Создать');
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
          popupDeliteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeliteCard.renderLoading(false, 'Да');
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
          popupEditAvatar.close();
        }).catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false, 'Сохранить');
        });
    }},'.popup-avatar');
    popupEditAvatar.setEventListeners();

    const cardClick = new PopupWithImage('.popup-image');
    cardClick.setEventListeners();

    const defaultCardList = new Section({
      data: result,
      renderer: (item) => {
        const card = new Card({
          item,
          handleCardClick: () => {
            cardClick.open(item.name, item.link);
          },
          handleLikeClick: (evt) => {
            if (!evt.target.classList.contains('element__like_active')) {
              api.addLike(item._id)
              .then((result) => {
                evt.target.classList.toggle('element__like_active');
                card.renderNumberLike(result);
              })
              .catch((err) => {
                console.log(err);
              });
            } else {
              api.deliteLike(item._id)
              .then((result) => {
                evt.target.classList.toggle('element__like_active');
                card.renderNumberLike(result);
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
 */
