import { imagePopap } from "./modal";

//функция удаления карточки
function deleteCard(element) {
  element.remove()
}

//функция лайка
function likeCard(event){
  event.target.classList.toggle('card__like-button_is-active');
}

//функция создания карточки
function createCard(name, img, openPopup){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    openPopup(imagePopap);
    imagePopap.querySelector('.popup__image').src = img;
    imagePopap.querySelector('.popup__image').alt = name;
    imagePopap.querySelector('.popup__caption').textContent = name;
  });
  return cardElement;
}

export {createCard};