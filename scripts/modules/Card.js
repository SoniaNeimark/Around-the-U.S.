export class Card {
  constructor(data, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._title = data.title;
    this._url = data.url;
  }

  /**Get an element from template*/
  _getTemplate() {
    return document
    .querySelector(this._cardTemplate)
    .content
    .querySelector(pageSettings.cardSelector)
    .cloneNode(true);
  }

  /**Create new card*/
  generateCard() {
    this._card = this._getTemplate()
    this._cardTitle = this._card.querySelector(pageSettings.cardTitleSelector);
    this._cardImage = this._card.querySelector(pageSettings.cardImageSelector);
    this._buttonDelete = this._card.querySelector(documentSettings.buttonDeleteSelector);
    this._buttonLike = this._card.querySelector(documentSettings.buttonLikeSelector);

    this._cardTitle.textContent = this._title;
    setImageAttributes(this._cardImage, { url: this._url, title: this._title });
    this._setEventListeners();

    return this._card;
  }

  /**Delete button's corresponding card*/
  _deleteCard = () => {
    this._card.remove();
  }

  /**Toggle like-button*/
  _toggleLike = () => {
    this._buttonLike.classList.toggle(documentSettings.buttonLikeActiveClass);
  }

  /**Open popup with the corresponding image*/
  _handleOpenTargetImagePopup = () => {
    const popup = pageSettings.popupImage
    const image = popup.querySelector(documentSettings.popupImageImageSelector);
    const subtitle = popup.querySelector(documentSettings.popupSubtitleSelector);

    subtitle.textContent = this._cardTitle.textContent;
    image.src = this._cardImage.src;
    image.alt = this._cardImage.alt;

    openPopup(popup);
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", this._deleteCard);
    this._buttonLike.addEventListener("click", this._toggleLike);
    this._cardImage.addEventListener("click", this._handleOpenTargetImagePopup);
  }
}