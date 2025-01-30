// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



function dellCard(element) {
  element.remove()
}

function addCard(name, img/*, delliCard*/){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => dellCard(cardElement));
  const placesList = document.querySelector('.places__list');
  placesList.append(cardElement);
}

let i = 0;

document.querySelector('.profile__add-button').addEventListener('click', function(event) {
  if (i > 5) {
    i = 0;
  }
  addCard(initialCards[i].name, initialCards[i].link/*, dellCard()*/);
  i++;
} )


initialCards.forEach(function(elem) {
  addCard(elem.name, elem.link/*, dellCard()*/);
})



