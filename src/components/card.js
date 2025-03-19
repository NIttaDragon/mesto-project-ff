import { deleteCardPopup } from "..";
import { closePopup, openPopup } from "./modal";
import { deleteCardData, /*likeData, unlikeData,*/ setLikeData } from "./api";

//функция удаления карточки
function deleteCard(element, cardId) {
  openPopup(deleteCardPopup);
  deleteCardPopup.querySelector('.popup__button').addEventListener('click', function() {
    deleteCardData(cardId)
    .then(response => {
      element.remove();
    })
    .catch((err) => {
      console.error('Не удалось удалить карточку: '+ err);
    });
    closePopup(deleteCardPopup);
  })
}

//функция лайка
function likeCard(event, cardId){
  if (!event.target.classList.contains('card__like-button_is-active')){
    //запрос на сервер с добавлением лайка
    //likeData(cardId)
    setLikeData('PUT', cardId)
    .then(response => {
      event.target.classList.toggle('card__like-button_is-active');
      event.target.closest('.like-wrapper').querySelector('.like-number').textContent = response.likes.length;
    })
    .catch((err) => {
      console.error('Не удалось поставить лайк: '+ err);
    });
  } else {
    //запрос на сервер с удалением лайка
    //unlikeData(cardId)
    setLikeData('DELETE', cardId)
    .then(response => {
      event.target.classList.toggle('card__like-button_is-active');
      event.target.closest('.like-wrapper').querySelector('.like-number').textContent = response.likes.length;
    })
    .catch((err) => {
      console.error('Не удалось отменить лайк: '+ err);
    });
  }
}

//функция создания карточки
function createCard(name, img, deleteCardFunction, likeCardFunction, openImagePopupFunction, likes, cardId, owner, user){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.like-number').textContent = likes;
  if (owner == user) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
      deleteCardFunction(cardElement, cardId)
    });
  } else {
    cardElement.querySelector('.card__delete-button').style.visibility = 'hidden';
  };
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
    likeCardFunction(evt, cardId)
  });
  cardElement.querySelector('.card__image').addEventListener('click', function(){
    openImagePopupFunction(img, name)
  });
  return cardElement;
}

export {deleteCard, likeCard, createCard};