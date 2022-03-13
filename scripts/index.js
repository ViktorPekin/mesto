const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__sub-name');

const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_edit-profile');
const popupInputName = popupProfile.querySelector('.popup__input_content_name');
const popupInputSubName = popupProfile.querySelector('.popup__input_content_sub-name');

const popupCards = document.querySelector('.popup_cards-add');
const popupInputCardsName = popupCards.querySelector('.popup__input_cards_name');
const popupInputCardsLink = popupCards.querySelector('.popup__input_cards_link');
const popupFormCards = popupCards.querySelector('.popup__form_cards-add');

const popupImage = document.querySelector('.popup-image');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageTitle = popupImage.querySelector('.popup-image__title');
const popupImageClose = popupImage.querySelector('.popup-image__close');

const templateElement = document.querySelector('.template-element').content;
const elementsGrid = document.querySelector('.elements__grid');
const initialCards = [
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

function popupOpen(pop) {
  pop.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
}

function popupSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  popupClose(popupProfile);
}

buttonOpenPopupProfil.addEventListener('click', () => {
  popupOpen(popupProfile);
});

buttonOpenPopupCards.addEventListener('click', () => {
  popupOpen(popupCards);
});

buttonClosePopup.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const a = evt.target.closest('.popup');
    popupClose(a);
  });
});

popupImageClose.addEventListener('click', () => {
  popupClose(popupImage);
});

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

popupFormProfile.addEventListener('submit', popupSave);

popupFormCards.addEventListener('submit', addCards);

function renderCards (card) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  element.querySelector('.element__text').textContent = card.name;
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__delite').addEventListener('click', deliteCards);
  element.querySelector('.element__like').addEventListener('click', toggleLikeCards);
  element.querySelector('.element__image').addEventListener('click', openPopupImage);
  elementsGrid.append(element);
}

function addCards(evt) {
  evt.preventDefault();
  const newElement = {name : popupInputCardsName.value, link : popupInputCardsLink.value};
  renderCards(newElement);
  popupClose(popupCards);
  popupInputCardsName.value = '';
  popupInputCardsLink.value = '';
}

function toggleLikeCards (evt) {
  evt.target.classList.toggle('element__like_active');
}

function deliteCards (evt) {
  const element = evt.currentTarget.closest('.element');
  element.remove();
}

function openPopupImage (evt) {
  popupImage.classList.add('popup_opened');
  popupImageImage.src = evt.target.src;
  popupImageTitle.textContent = evt.target.nextElementSibling.
  firstElementChild.textContent;
}

initialCards.map(renderCards);

