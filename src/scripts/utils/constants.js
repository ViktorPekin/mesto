export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  form: '.popup__form',
  input: '.popup__input',
  buttom: '.popup__button',
  inputError: 'popup__input_type_error',
  spanError: 'popup__input-error',
  buttonValid: 'popup__button_valid',
  buttonInvalid: 'popup__button_invalid',
  formCardAdd: 'popup__form_cards-add'
};

export const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
export const buttonOpenPopupCards = document.querySelector('.profile__button');

export const popupProfile = document.querySelector('.popup_edit-profile');
export const popupCards = document.querySelector('.popup_cards-add');
