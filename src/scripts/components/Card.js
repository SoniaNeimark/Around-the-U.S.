/**Create Card class*/
export default class Card {
  constructor({ title, url }, data, handleCardClick) {
    this._title = title;
    this._url = url;
    this._data = data;
    this._handleCardClick = handleCardClick;
  }

  /**Get an element from template*/
  _getTemplate() {
    return document
    .querySelector(this._data.cardTemplateSelector)
    .content
    .querySelector(this._data.cardSelector)
    .cloneNode(true);
  }

  /**Create new card*/
  generateCard() {
    this._card = this._getTemplate()
    this._cardTitle = this._card.querySelector(this._data.cardTitleSelector);
    this._cardImage = this._card.querySelector(this._data.cardImageSelector);
    this._buttonDelete = this._card.querySelector(this._data.buttonDeleteSelector);
    this._buttonLike = this._card.querySelector(this._data.buttonLikeSelector);

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._url;
    this._setEventListeners();

    return this._card;
  }

  /**Delete button's corresponding card*/
  _deleteCard = () => {
    this._card.remove();
  }

  /**Toggle like-button*/
  _toggleLike = () => {
    this._buttonLike.classList.toggle(this._data.buttonLikeActiveClass);
  }

  /**Set event-listeners for click events on delete- && like-buttons && for card image*/
  _setEventListeners() {
    this._buttonDelete.addEventListener("click", this._deleteCard);
    this._buttonLike.addEventListener("click", this._toggleLike);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
