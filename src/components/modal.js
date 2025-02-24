//редактирование профиля
const editPopap = document.querySelector('.popup_type_edit');

//добавление новых карточек
const newCardPopap = document.querySelector('.popup_type_new-card');

//приближение карточки
const imagePopap = document.querySelector('.popup_type_image');

//функция выхода из попапа на Esc
function escClosePopup(event) {
  if (event.key === 'Escape'){
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

//функция выхода из попапа на overlay
function overlayClosePopup(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closePopup(event.currentTarget)
  }
}

//функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClosePopup);
  popupElement.addEventListener('click', overlayClosePopup);
}

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClosePopup);
  popupElement.removeEventListener('click', overlayClosePopup);
}

export {imagePopap, editPopap, newCardPopap, closePopup, openPopup};