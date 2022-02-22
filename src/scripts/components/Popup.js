import { documentSettings } from "../utils/settings.js";
const {
  popupOpenClass,
  buttonCloseSelector
} = documentSettings;

/**Create Popup class */
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(buttonCloseSelector);
  }

/**Open popup */
  open = () => {
    this._popup.classList.add(popupOpenClass);
    this.setEventListeners();
  }

/**Close popup */
  close = () => {
    this._popup.classList.remove(popupOpenClass);
    this.removeEventListeners();
  }

/**Escape key handler */
  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  }

/**Close on click handler */
  _handleClickClose = (evt) => {
    if (evt.target  == this._popup || evt.target == this._buttonClose) {
      this.close();
    }
  }

/**Set event-listeners for click && esc events */
  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

/**Remove event-listeners for click && esc events */
  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
