const API_URL = 'https://nomoreparties.co/v1/wff-cohort-34';
const API_TOKEN = 'bfe454f8-6d39-448e-b633-be779ce273e8';

//получение данных профиля
const profileData = function() {
  return (
    fetch(`${API_URL}/users/me`, {
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

//получение карточек с сервера
const cardsData = function() {
  return(
    fetch(`${API_URL}/cards`, {
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

//отправка новых данных профиля
const newProfileData = function(newTitle, newDescription){
  return(
    fetch(`${API_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newTitle,
        about: newDescription
      })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

//отправка данных новой карточки
const newCardData = function(cardName, cardLink){
  return(
    fetch(`${API_URL}/cards`, {
      method: 'POST',
      headers: {
        authorization: API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  );
}

//изменение аватара
const newAvatarData = function(avatarLink){
  return(
    fetch(`${API_URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

//удаление карточки
const deleteCardData = function(cardId){
  return(
    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

/*//поставить лайк
const likeData = function(cardId){
  return(
    fetch(`${API_URL}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}

//убрать лайк
const unlikeData = function(cardId){
  return(
    fetch(`${API_URL}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}*/

//изменение значение лайка
const setLikeData = function(methodType, cardId){
  return(
    fetch(`${API_URL}/cards/likes/${cardId}`, {
      method: methodType,
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  )
}
//не знаю, можно ли было объеденить запросы, поэтому старый вариант не удаляла



export {profileData, cardsData, newProfileData, newCardData, newAvatarData, deleteCardData, /*likeData, unlikeData,*/ setLikeData}
