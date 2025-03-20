const API_URL = 'https://nomoreparties.co/v1/wff-cohort-34';
const API_TOKEN = 'bfe454f8-6d39-448e-b633-be779ce273e8';

//получение данных профиля
const getProfileData = function() {
  return (
    fetch(`${API_URL}/users/me`, {
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => handleResponse(res))
  )
}

//получение карточек с сервера
const getCardsData = function() {
  return(
    fetch(`${API_URL}/cards`, {
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => handleResponse(res))
  )
}

//отправка новых данных профиля
const setNewProfileData = function(newTitle, newDescription){
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
    }).then(res => handleResponse(res))
  )
}

//отправка данных новой карточки
const postNewCardData = function(cardName, cardLink){
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
    }).then(res => handleResponse(res))
  );
}

//изменение аватара
const setNewAvatarData = function(avatarLink){
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
    }).then(res => handleResponse(res))
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
    }).then(res => handleResponse(res))
  )
}

//изменение значение лайка
const setLikeData = function(likeStatus, cardId){
  return(
    fetch(`${API_URL}/cards/likes/${cardId}`, {
      method: likeStatus ? 'PUT' : 'DELETE',
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => handleResponse(res))
  )
}

//обработка результата запроса
function handleResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {getProfileData, getCardsData, setNewProfileData, postNewCardData, setNewAvatarData, deleteCardData, setLikeData}
