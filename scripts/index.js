let buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
let profileName = document.querySelector('.profile__name');
let profileSubName = document.querySelector('.profile__sub-name');
let popupProfile = document.querySelector('.popup_edit-profile');
let popupCards = document.querySelector('.popup_cards-add');
let buttonClosePopup = document.querySelectorAll('.popup__close');
let popupFormProfile = document.querySelector('.popup__form_edit-profile');
let popupInputName = document.querySelector('.popup__input_content_name');
let popupInputSubName = document.querySelector('.popup__input_content_sub-name');

const popupInputCardsName = document.querySelector('.popup__input_cards_name');
const popupInputCardsLink = document.querySelector('.popup__input_cards_link');
const popupFormCards = document.querySelector('.popup__form_cards-add');

function popupOpen(pop) {
  pop.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
}

function popupSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  popupClose();
}

buttonOpenPopupProfil.addEventListener('click', () => {
  popupOpen(popupProfile);
});

buttonOpenPopupCards.addEventListener('click', () => {
  popupOpen(popupCards);
});

function popupClose() {buttonClosePopup.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const a = evt.target.closest('.popup');
    a.classList.remove('popup_opened');
  });
});
};

popupFormProfile.addEventListener('submit', popupSave);


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

const templateElement = document.querySelector('.template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

popupFormCards.addEventListener('submit', addCards);


function renderCards (cardText) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  initialCards.forEach(function (item){


  });
  element.querySelector('.element__text').textContent = cardText;
    elementsGrid.append(element);

}

function addCards(evt) {
  evt.preventDefault();

  const newElement = popupInputCardsName.value;

  renderCards(newElement);
  popupClose(popupCards);
}



initialCards.map(renderCards);

