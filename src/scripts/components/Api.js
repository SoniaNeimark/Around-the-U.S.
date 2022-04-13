export default class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`)
    })
    .catch((err) => {
      console.log(err);
    })

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()])
    .then((values) => {
      return values
    })
    .catch((err) => {
      console.log(err);
    })
  }

  editProfile( {name, about} ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
    .catch(err => console.log(err))
  }

  editAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
    .catch(err => console.log(err))
  }

  addCard(cardObj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardObj)
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
    .catch((err) => (console.log(err)))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.statusText)
    })
    .catch((err) => console.log(err))
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
    .catch((err) => console.log(err))
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
    .catch((err) => console.log(err))
  }
}
