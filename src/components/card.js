import { imagePopap/*, openPopup*/ } from "./modal";
//import { openImagePopup/*Function*/ } from "..";

//функция удаления карточки
function deleteCard(element) {
  element.remove()
}

//функция лайка
function likeCard(event){
  event.target.classList.toggle('card__like-button_is-active');
}

//функция создания карточки
function createCard(name, img, deleteCardFunction, likeCardFunction, openImagePopupFunction){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    deleteCardFunction(cardElement)
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunction);
  cardElement.querySelector('.card__image').addEventListener('click', function(){
    openImagePopupFunction(imagePopap, img, name)
  });
  return cardElement;
}

export {deleteCard, likeCard, createCard};