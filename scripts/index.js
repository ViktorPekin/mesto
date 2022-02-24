let buttonOpenPopup = document.querySelector('.profile__info-button');
let profileName = document.querySelector('.profile__name');
let profileSubName = document.querySelector('.profile__sub-name');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let buttonClosePopup = popup.querySelector('.popup__close');
let popupInputName = popup.querySelector('.popup__input_content_name');
let popupInputSubName = popup.querySelector('.popup__input_content_sub-name');


function popupOpen() {
  popup.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputSubName.value = profileSubName.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubName.textContent = popupInputSubName.value;
  popupClose();
}

buttonOpenPopup.addEventListener('click', popupOpen);
buttonClosePopup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSave);



