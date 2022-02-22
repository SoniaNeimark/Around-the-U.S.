import Popup from "./Popup.js";
import { documentSettings } from "../utils/settings.js";
const {
  popupSubtitleSelector,
  popupImageImageSelector,
  popupOpenClass
} = documentSettings;

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (cardImage) => {
    this._popup.querySelector(popupSubtitleSelector).textContent = cardImage.alt;
    this._popup.querySelector(popupImageImageSelector).alt = cardImage.alt;
    this._popup.querySelector(popupImageImageSelector).src = cardImage.src;
    this._popup.classList.add(popupOpenClass);
    super.setEventListeners();
  }
}
