let profile =document.querySelector('.profile');
let buttonOpenPopup = profile.querySelector('.profile__info-button');
let profileName = profile.querySelector('.profile__name');
let profileSubName = profile.querySelector('.profile__sub-name');



let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let buttonClosePopup = popup.querySelector('.popup__close');
let popupInput = popup.querySelectorAll('.popup__input');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupInput[0].value = profileName.textContent;
  popupInput[1].value = profileSubName.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

buttonOpenPopup.addEventListener('click', popupOpen);
buttonClosePopup.addEventListener('click', popupClose);


function popupSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupInput[0].value;
  profileSubName.textContent = popupInput[1].value;
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', popupSave);



