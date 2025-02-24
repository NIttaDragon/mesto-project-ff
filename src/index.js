import './pages/index.css';
import { initialCards } from './cards';
import { deleteCard, likeCard, createCard } from './components/card';
import { imagePopap, editPopap, newCardPopap, closePopup, openPopup } from './components/modal';

//место для карточек
const placesList = document.querySelector('.places__list');

//редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const formEdit = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//добавление новых карточек
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];

//добавление поавности попапам
imagePopap.classList.add('popup_is-animated');
editPopap.classList.add('popup_is-animated');
newCardPopap.classList.add('popup_is-animated');

//запись данных профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = formEdit.elements.name.value;
  profileDescription.textContent =  formEdit.elements.description.value;
  closePopup(editPopap);
}

//создание новой карточки поо кнопке
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(formNewCard.elements['place-name'].value, formNewCard.elements.link.value, deleteCard, likeCard, openImagePopup); 
  placesList.prepend(cardElement);
  formNewCard.reset();
  closePopup(newCardPopap);
}

function openImagePopup(imagePopap, img, name) {
  openPopup(imagePopap);
    imagePopap.querySelector('.popup__image').src = img;
    imagePopap.querySelector('.popup__image').alt = name;
    imagePopap.querySelector('.popup__caption').textContent = name;
}

//создание и вставка начальных карточек на экран
initialCards.forEach(function(elem) {
  const cardElement = createCard(elem.name, elem.link, deleteCard, likeCard, openImagePopup);
  placesList.append(cardElement);
})

//обработчики событий на кнопки открытия попапов
editButton.addEventListener('click', function () {
  openPopup(editPopap);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
});

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopap);
});

//кнопка сохранения данных профиля
formEdit.addEventListener('submit', handleEditFormSubmit); 

//кнопка добавления карточки
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

//export {openImagePopup /*as openImagePopupFunction*/};