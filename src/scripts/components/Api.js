export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._header
    }).then(this._checkResponse);
  }

  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._header
    }).then(this._checkResponse);
  }

  patchProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        about: data.subName
      })
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse);
  }

  deliteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._header
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._header
    }).then(this._checkResponse);
  }

  deliteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._header
    }).then(this._checkResponse);
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: data
      })
    }).then(this._checkResponse);
  }
}
