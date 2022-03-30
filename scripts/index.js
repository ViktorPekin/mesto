const buttonOpenPopupProfil = document.querySelector('.profile__info-button');
const buttonOpenPopupCards = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__sub-name');

const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_edit-profile');
const popupInputName = popupProfile.querySelector('.popup__input_content_name');
const popupInputSubName = popupProfile.querySelector('.popup__input_content_sub-name');
const popupButtonProfile = popupProfile.querySelector('.popup__button');

const popupCards = document.querySelector('.popup_cards-add');
const popupInputCardsName = popupCards.querySelector('.popup__input_cards_name');
const popupInputCardsLink = popupCards.querySelector('.popup__input_cards_link');
const popupFormCards = popupCards.querySelector('.popup__form_cards-add');
const popupButtonCardAdd = popupCards.querySelector('.popup__button');

const popupImage = document.querySelector('.popup-image');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageTitle = popupImage.querySelector('.popup-image__title');

const templateElement = document.querySelector('.template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

function openPopup(pop) {
  pop.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
  pop.addEventListener('click', closePopupOnOverlay);
}

function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  closePopup(popupProfile);
}

function openProfilePopup() {
  const inputList = Array.from(popupProfile.querySelectorAll(config.input));
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
  inputList.forEach((inputElement) => {
    hideInputError(popupProfile, inputElement, config);
  });
  openPopup(popupProfile);
}

buttonOpenPopupProfil.addEventListener('click', () => {
  openProfilePopup();
  disableRemoveFormSubmitButton(popupButtonProfile, config);
});

buttonOpenPopupCards.addEventListener('click', () => {
  openPopup(popupCards);
  disableAddFormSubmitButton(popupButtonCardAdd, config);
});

function closePopupOnOverlay (event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closePopup(activePopup);
  }
}

function closePopupOnEscape(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
  popup.removeEventListener('click', closePopupOnOverlay);
}

popupFormProfile.addEventListener('submit', savePopup);

popupFormCards.addEventListener('submit', addNewCards);

function renderCards (card) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  element.querySelector('.element__text').textContent = card.name;
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__delite').addEventListener('click', deliteCards);
  element.querySelector('.element__like').addEventListener('click', toggleLikeCards);
  element.querySelector('.element__image').addEventListener('click', openPopupImage);
  return element;
}

function addCards (card) {
  elementsGrid.prepend(renderCards(card));
}

function addNewCards(evt) {
  evt.preventDefault();
  const newElement = {name : popupInputCardsName.value, link : popupInputCardsLink.value};
  addCards(newElement);
  closePopup(popupCards);
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
  openPopup(popupImage);
  popupImageImage.src = evt.target.src;
  popupImageTitle.textContent = evt.target.nextElementSibling.
  firstElementChild.textContent;
}

initialCards.forEach(addCards);
