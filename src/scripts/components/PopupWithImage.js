import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(data, popupSelector);
    this._subtitle = this._popup.querySelector(this._data.popupSubtitleSelector);
    this._image = this._popup.querySelector(this._data.popupImageImageSelector);
  }

  open(cardImage) {
    this._subtitle.textContent = cardImage.alt;
    this._image.alt = cardImage.alt;
    this._image.src = cardImage.src;
    super.open();
  }
}
