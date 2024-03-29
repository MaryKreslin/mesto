export default class Api {
  constructor(options) {
    this._options = options;
    this._url = this._options.baseUrl;
    this._code = this._options.headers.authorization;
    this._headers = this._options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._code
      }
    })
      .then(this._checkResponse)
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._code
      }
    })
      .then(this._checkResponse)
  }

  patchUserInfo(newName, newAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(this._checkResponse)
  }

  addNewCard(newName, newlink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newlink
      })
    })
      .then(this._checkResponse)
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
      
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._code
      },
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._code
      },
    })
      .then(this._checkResponse)
  }

  pacthAvatarImg(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(this._checkResponse)
  }
}
