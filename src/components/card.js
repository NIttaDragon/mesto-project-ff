import { deleteCardPopup } from "..";
import { closePopup, openPopup } from "./modal";
import { deleteCardData, setLikeData } from "./api";

//функция удаления карточки
function deleteCard(element, cardId) {
  openPopup(deleteCardPopup);

  // Определяем функцию обработчика клика, чтобы её можно было переназначить
  deleteCardPopup.onclick = function(event) {
    // Проверяем, что клик был именно по кнопке
    if (event.target.classList.contains('popup__button')) { 
      deleteCardData(cardId)
        .then(response => {
          element.remove();
        })
        .catch((err) => {
          console.error('Не удалось удалить карточку: ' + err);
        })
        .finally(() => {
          closePopup(deleteCardPopup);
          // Очищаем обработчик, чтобы избежать повторного выполнения при последующих открытиях попапа
          deleteCardPopup.onclick = null;
        });
    }
  };
}


//функция обработки лайка
function likeCard(event, cardId){
  const likeStatus = !event.target.classList.contains('card__like-button_is-active');
    setLikeData(likeStatus, cardId)
    .then(response => {
      event.target.classList.toggle('card__like-button_is-active');
      event.target.closest('.like-wrapper').querySelector('.like-number').textContent = response.likes.length;
    })
    .catch((err) => {
      console.error(likeStatus ? `Не удалось поставить лайк: ${err}` : `Не удалось отменить лайк: ${err}`);
    });
}

//функция создания карточки
function createCard(elem, deleteCardFunction, likeCardFunction, openImagePopupFunction, userId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = elem.link;
  cardElement.querySelector('.card__image').alt = elem.name;
  cardElement.querySelector('.card__title').textContent = elem.name;
  cardElement.querySelector('.like-number').textContent = elem.likes.length;
  if (elem.owner._id == userId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
      deleteCardFunction(cardElement, elem._id)
    });
  } else {
    cardElement.querySelector('.card__delete-button').style.visibility = 'hidden';
  };
  //отображениие уже лайкнутых этим пользователем карточек
  if(elem.likes.length !=0 ){
      if(elem.likes.some(like => like._id === userId)){ 
        cardElement.querySelector('.card__like-button').classList.add("card__like-button_is-active"); 
  }
  };
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
    likeCardFunction(evt, elem._id)
  });
  cardElement.querySelector('.card__image').addEventListener('click', function(){
    openImagePopupFunction(elem.link, elem.name)
  });
  return cardElement;
}

export {deleteCard, likeCard, createCard};