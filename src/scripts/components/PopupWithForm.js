import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(data, popupSelector, handleSubmit) {
    super(data, popupSelector);
    this._form = this._popup.querySelector("form");
    this._handleSubmit = handleSubmit;
    this._inputElements = Array.from(this._popup.querySelectorAll(this._data.inputSelector));
  }

  getInputValues() {
    this._formValues = {};
    this._inputElements.forEach(inputElement => this._formValues[inputElement.name] = inputElement.value);
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }
}
