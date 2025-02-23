//редактирование профиля
const editPopap = document.querySelector('.popup_type_edit');

//добавление новых карточек
const newCardPopap = document.querySelector('.popup_type_new-card');

//приближение карточки
const imagePopap = document.querySelector('.popup_type_image');

//добавление поавности попапам
imagePopap.classList.add('popup_is-animated');
editPopap.classList.add('popup_is-animated');
newCardPopap.classList.add('popup_is-animated');

//функция выхода из попапа на Esc
function escClosePopup(event) {
  if (event.key === 'Escape' || event.keyCode === 27){
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

//функция выхода из попапа на overlay
function overlayClosePopup(event) {
  if (!event.target.classList.contains('popup__content')){
    closePopup(event.target);
  }
}

//функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClosePopup);
  popupElement.addEventListener('click', overlayClosePopup);
  const closePopapButton = popupElement.querySelector('.popup__close');
  closePopapButton.addEventListener('click', function (){
    closePopup(popupElement);
  });
}

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClosePopup);
  popupElement.removeEventListener('click', overlayClosePopup);
}

export {imagePopap, editPopap, newCardPopap, closePopup, openPopup};