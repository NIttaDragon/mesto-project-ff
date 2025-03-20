import './pages/index.css';
import { deleteCard, likeCard, createCard } from './components/card';
import { closePopup, openPopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getProfileData, getCardsData, setNewProfileData, postNewCardData, setNewAvatarData } from './components/api';

//место для карточек
const placesList = document.querySelector('.places__list');

//редактирование профиля
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formEdit = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//добавление новых карточек
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];

//приближение карточки
const imagePopup = document.querySelector('.popup_type_image');

//удаление карточки
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

//изменение аватара
const avatarChangePopup = document.querySelector('.popup_type_change-avatar');
const avatarEdit = document.querySelector('.avatar_edit');
const avatarForm = document.forms['avatar'];

//объект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input-error',
  errorClass: 'form__input-error'
}

//добавление поавности попапам
imagePopup.classList.add('popup_is-animated');
editPopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
deleteCardPopup.classList.add('popup_is-animated');
 
//запросы к серверу
function fetchDataAsync() {
  return Promise.all([
    getProfileData(),
    getCardsData()
  ]);
}

fetchDataAsync()
  .then(([profileData, cardsData]) => {
    //установка данных пользователя
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = "url(" + profileData.avatar+")";

    //установка значений карточек
    cardsData.forEach(function(elem) {
      const cardElement = createCard(elem, deleteCard, likeCard, openImagePopup, profileData._id);
      placesList.append(cardElement);
    })
  })

//запись данных профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...'; 
  const newTitle = formEdit.elements.name.value;
  const newDescription = formEdit.elements.description.value;
  setNewProfileData(newTitle, newDescription)
    .then(response => {
      profileTitle.textContent = response.name;
      profileDescription.textContent =  response.about;
    })
    .catch((err) => {
      console.error('Не удалось изменить данные профиля: '+ err);
    })
    .finally(() => {
      editPopup.querySelector('.popup__button').textContent = 'Сохранить';
    });
  closePopup(editPopup);
}

//создание новой карточки по кнопке
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
  const cardName = formNewCard.elements['place-name'].value;
  const cardLink = formNewCard.elements.link.value;
  postNewCardData(cardName, cardLink)
  .then(response => {
    const cardElement = createCard(cardName, cardLink, deleteCard, likeCard, openImagePopup, 0, response._id, response.owner._id, response.owner._id ); 
    placesList.prepend(cardElement);
  })
  .catch((err) => {
    console.error('Не удалось создать новую карточку: '+ err);
  })
  .finally(() => {
    newCardPopup.querySelector('.popup__button').textContent = 'Сохранить';
  });
  formNewCard.reset();
  closePopup(newCardPopup);
}

//изменение аватара по кнопке
function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
  const avatarLink = avatarForm.elements.link.value;
  setNewAvatarData(avatarLink)
  .then((response) => {
    profileImage.style.backgroundImage = "url(" + response.avatar+")";
  })
  .catch((err) => {
    console.error('Не удалось изменить фото профиля: '+ err);
  })
  .finally(() => {
    avatarChangePopup.querySelector('.popup__button').textContent = 'Сохранить';
  });
  avatarForm.reset();
  closePopup(avatarChangePopup);
}

//увеличение картинки
function openImagePopup(img, name) {
  openPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = img;
    imagePopup.querySelector('.popup__image').alt = name;
    imagePopup.querySelector('.popup__caption').textContent = name;
}

//обработка валидации форм
enableValidation(validationConfig);

//обработчики событий на кнопки открытия попапов
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
});

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
  clearValidation(formNewCard, validationConfig);
});

//кнопка сохранения данных профиля
formEdit.addEventListener('submit', handleEditFormSubmit); 

//кнопка добавления карточки
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

//изменение аватара
avatarEdit.addEventListener('click', function() {
  openPopup(avatarChangePopup);
})

avatarForm.addEventListener('submit', handleAvatarEditFormSubmit);

export {deleteCardPopup}
