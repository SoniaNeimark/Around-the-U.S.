/**Create Card class*/
export default class Card {
  constructor(cardObj, myId, props, handleCardClick, handleDelete, handleLike) {
    this.cardObj = cardObj
    this._title = this.cardObj.name;
    this._url = this.cardObj.link;
    this._myId = myId
    this._props = props;
    //this._actvateDelete = actvateDelete
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    //this.isLiked = false
  }

  /**Get an element from template*/
  _getTemplate() {
    return document
    .querySelector(this._props.cardTemplateSelector)
    .content
    .querySelector(this._props.cardSelector)
    .cloneNode(true);
  }

  isOwner = () => {
    return this.cardObj.owner._id == this._myId
  }

  hasLike = (like) => {
    return like._id == this._myId
  }

  _checkLikes = () => {
    if (this.cardObj.likes.length > 0) {
      return this.cardObj.likes.some((like) => {
        return this.hasLike(like)
      })
    } else {
      return false
    }
  }

  getCardId = () => {
     return this.cardObj._id;
  }

  /**Create new card*/
  generateCard() {
    this._card = this._getTemplate()
    this._cardTitle = this._card.querySelector(this._props.cardTitleSelector);
    this._cardImage = this._card.querySelector(this._props.cardImageSelector);
    this._buttonDelete = this._card.querySelector(this._props.buttonDeleteSelector);
    this._buttonLike = this._card.querySelector(this._props.buttonLikeSelector);
    this.likesNumber = this._card.querySelector(this._props.cardLikesNumberSelector);

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._url;
    this.cardId = this.cardObj._id;
    this.updateLikes(this.cardObj)

    if (this._checkLikes()) {
      this.addLike()
    }

    if (this.isOwner()) {
      this._buttonDelete.classList.add(this._props.buttonDeleteActiveClass)
    }

    this._setEventListeners();

    return this._card;
  }

  updateLikes = (value) => {
    this.likesNumber.textContent = value.likes.length
  }

  deleteCard = () => {
    this._card.remove();
  }

  hasId = () => {
    return this._myId
  }

  isLiked = () => {
    return this._buttonLike.classList.contains(this._props.buttonLikeActiveClass)
  }

  addLike = () => {
    this._buttonLike.classList.add(this._props.buttonLikeActiveClass);
  }

  removeLike = () => {
    this._buttonLike.classList.remove(this._props.buttonLikeActiveClass);
  }

  /**Set event-listeners for click events on delete- && like-buttons && for card image*/
  _setEventListeners() {
    this._buttonDelete.addEventListener("click", this._handleDelete);
    this._buttonLike.addEventListener("click", this._handleLike);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
