export class Api {
  constructor() {
    this._authorization = '535d3a03-0687-4a91-b587-5369f637f559';
  }

  getInitialProfile() {
    return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
      headers:{
        authorization: this._authorization
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
      headers:{
        authorization: this._authorization
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchProfile(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.subName
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deliteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}`, {
      method: 'DELETE',
      headers:{
        authorization: this._authorization
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}/likes`, {
      method: 'PUT',
      headers:{
        authorization: this._authorization
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deliteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}/likes`, {
      method: 'DELETE',
      headers:{
        authorization: this._authorization
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
