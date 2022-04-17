import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector, cardObj) {
    super(data, popupSelector);
    this._subtitle = this._popup.querySelector(this._data.popupSubtitleSelector);
    this._image = this._popup.querySelector(this._data.popupImageImageSelector);
    this.cardObj = cardObj
  }

  open() {
    this._subtitle.textContent = this.cardObj.name;
    this._image.alt = this.cardObj.name;
    this._image.src = this.cardObj.link;
    super.open();
  }
}
