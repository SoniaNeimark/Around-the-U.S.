/**Create Card class*/
export default class Card {
  constructor(cardObj, myId, props, handleCardClick, handleDelete, handleLike) {
    this._cardObj = cardObj
    this._title = this._cardObj.name;
    this._url = this._cardObj.link;
    this._myId = myId
    this._props = props;
    //this._actvateDelete = actvateDelete
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  /**Get an element from template*/
  _getTemplate() {
    return document
    .querySelector(this._props.cardTemplateSelector)
    .content
    .querySelector(this._props.cardSelector)
    .cloneNode(true);
  }

  /**Create new card*/
  generateCard() {
    this._card = this._getTemplate()
    this._cardTitle = this._card.querySelector(this._props.cardTitleSelector);
    this._cardImage = this._card.querySelector(this._props.cardImageSelector);
    this._buttonDelete = this._card.querySelector(this._props.buttonDeleteSelector);
    this._buttonLike = this._card.querySelector(this._props.buttonLikeSelector);
    this._likesNumber = this._card.querySelector(this._props.cardLikesNumberSelector);
    if (this._cardObj.likes.some(like => like._id == this._myId)) {
      this._buttonLike.classList.add(this._props.buttonLikeActiveClass)
    }

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._url;
    this._likesNumber.textContent = this._cardObj.likes.length

    if (this._cardObj.owner._id == this._myId) {
      this._buttonDelete.classList.add(this._props.buttonDeleteActiveClass)
    }

    this._setEventListeners();


    return this._card;
  }

  deleteCard = () => {
    this._card.remove();
  }

  chekIfLiked = () => {
    return this._likes.some(this.hasId)
  }

  addLike = () => {
    this._buttonLike.classList.add(this._props.buttonLikeActiveClass);
  }

  removeLike = () => {
    this._buttonLike.classList.remove(this._props.buttonLikeActiveClass);
  }

  /**Toggle like-button*/
  //toggleLike = () => {
    //this._buttonLike.classList.toggle(this._props.buttonLikeActiveClass);
    //this._isLiked != this._isLiked
    //console.log(this._isLiked)
  //}

  /**Set event-listeners for click events on delete- && like-buttons && for card image*/
  _setEventListeners() {
    //if (this._buttonDelete.classList.contains(this._props.buttonDeleteActiveClass)) {
    this._buttonDelete.addEventListener("click", this._handleDelete);
    //}
    this._buttonLike.addEventListener("click", this._handleLike);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
