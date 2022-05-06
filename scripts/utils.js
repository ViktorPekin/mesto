export function openPopup(popup) {
/*   popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
  popup.addEventListener('click', closePopupOnOverlay); */
}

export function closePopupOnOverlay (event) {
/*   const activePopup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closePopup(activePopup);
  } */
}

export function closePopupOnEscape(event) {
/*   const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(activePopup);
  } */
}

export function closePopup(popup) {
/*   popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
  popup.removeEventListener('click', closePopupOnOverlay); */
}
