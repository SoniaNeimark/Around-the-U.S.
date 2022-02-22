import Popup from "./Popup.js";
import { validationSettings } from "../utils/settings.js";
import { documentSettings } from "../utils/settings.js";
const { popupOpenClass } = documentSettings;
const { inputSelector } = validationSettings;

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._handleSubmit = handleSubmit;
  }

  getInputValues() {
    this._data = {};
    this._inputElements = Array.from(this._popup.querySelectorAll(inputSelector));
    this._inputElements.forEach((inputElement) => {
      this._data[this._inputElements.indexOf(inputElement)] = inputElement.value;
    });
    return this._data;
  }

  close = () => {
    this._popup.classList.remove(popupOpenClass);
    this.removeEventListeners();
    this._popup.querySelector("form").reset();
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
    this._form.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    this._form.removeEventListener("submit", this._handleSubmit);
  }
}
