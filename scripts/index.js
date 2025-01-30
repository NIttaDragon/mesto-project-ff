// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

//функция удаления карточки
function deleteCard(element) {
  element.remove()
}

//функция создания карточки
function createCard(name, img){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  
  return cardElement;
}

//создание и вставка начальных карточек на экран
initialCards.forEach(function(elem) {
  const cardElement = createCard(elem.name, elem.link);
  placesList.append(cardElement);
})



