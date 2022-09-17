class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;

    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Ошибка при загрузке данных');
  }

  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._getHeaders(),
    })
      .then(this._getJsonOrError)
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
    })
      .then(this._getJsonOrError)
  }

  setUserData(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getJsonOrError)
  }

  createCard({ name, url }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: url
      })
    })
      .then(this._getJsonOrError)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getJsonOrError)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getJsonOrError)
  }

  setAva(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getJsonOrError)
  }

}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', '216df983-7365-4312-a47e-9764ea1d99b1')
export default api