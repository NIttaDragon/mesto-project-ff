import './pages/index.css';
import { deleteCard, likeCard, createCard } from './components/card';
import { closePopup, openPopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { profileData, cardsData, newProfileData, newCardData, newAvatarData } from './components/api';

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
    profileData(),
    cardsData()
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
      const cardElement = createCard(elem.name, elem.link, deleteCard, likeCard, openImagePopup, elem.likes.length, elem._id, elem.owner._id, profileData._id);
    
      //отображениие уже лайкнутых этим пользователем карточек
      if(elem.likes.length !=0 ){
        elem.likes.forEach((likes) => {
          if(likes._id == profileData._id){
            cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
          }
        })
      }
      placesList.append(cardElement);
    })
  })

//запись данных профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...'; 
  const newTitle = formEdit.elements.name.value;
  const newDescription = formEdit.elements.description.value;
  newProfileData(newTitle, newDescription)
    .then(response => {
      profileTitle.textContent = response.name;
      profileDescription.textContent =  response.about;
      evt.target.querySelector('.popup__button').textContent = 'Сохранено';
    })
    .catch((err) => {
      alert('Не удалось изменить данные профиля');
      console.error('Не удалось изменить данные профиля: '+ err);
    });
  closePopup(editPopup);
}

//создание новой карточки по кнопке
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
  const cardName = formNewCard.elements['place-name'].value;
  const cardLink = formNewCard.elements.link.value;
  newCardData(cardName, cardLink)
  .then(response => {
    const cardElement = createCard(cardName, cardLink, deleteCard, likeCard, openImagePopup, 0, response._id, response.owner._id, response.owner._id ); 
    placesList.prepend(cardElement);
    evt.target.querySelector('.popup__button').textContent = 'Сохранено';
  })
  .catch((err) => {
    alert('Не удалось создать новую карточку');
    console.error('Не удалось создать новую карточку: '+ err);
  });
  formNewCard.reset();
  closePopup(newCardPopup);
}

//изменение аватара по кнопке
function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
  const avatarLink = avatarForm.elements.link.value;
  newAvatarData(avatarLink)
  .then((response) => {
    profileImage.style.backgroundImage = "url(" + response.avatar+")";
    evt.target.querySelector('.popup__button').textContent = 'Сохранено';
  })
  .catch((err) => {
    alert('Не удалось изменить фото профиля');
    console.error('Не удалось изменить фото профиля: '+ err);
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
enableValidation({
  formSelector: '.popup__form',
  inputSelector: validationConfig.inputSelector,
  submitButtonSelector: validationConfig.submitButtonSelector,
  //inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: validationConfig.inputErrorClass,
  errorClass: validationConfig.errorClass
});

//обработчики событий на кнопки открытия попапов
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  editPopup.querySelector('.popup__button').textContent = 'Сохранить';
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
});

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
  newCardPopup.querySelector('.popup__button').textContent = 'Сохранить';
  clearValidation(formNewCard, validationConfig);
});

//кнопка сохранения данных профиля
formEdit.addEventListener('submit', handleEditFormSubmit); 

//кнопка добавления карточки
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

//изменение аватара
avatarEdit.addEventListener('click', function() {
  avatarChangePopup.querySelector('.popup__button').textContent = 'Сохранить';
  openPopup(avatarChangePopup);
  
})

avatarForm.addEventListener('submit', handleAvatarEditFormSubmit);

export {deleteCardPopup}
