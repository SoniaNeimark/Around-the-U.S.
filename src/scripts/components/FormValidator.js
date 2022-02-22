export class FormValidator {
  constructor(data, formElementSelector) {
    this._formElement = document.querySelector(formElementSelector);
    this._data = data;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
  }

  /**Show input-error message*/
  _showInputError(inputElement) {
    inputElement.classList.add(this._data.inputErrorClass);
    this._errorText = this
    ._formElement
    .querySelector(`${this._data.errorHiddenSelector}_${inputElement.id}`);
    this._errorText.textContent = inputElement.validationMessage;
    this._errorText.classList.add(this._data.errorClass);
  }

  /**Hide input-error message*/
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._data.inputErrorClass);
    this._errorText = this
    ._formElement
    .querySelector(`${this._data.errorHiddenSelector}_${inputElement.id}`);
    this._errorText.textContent = "";
    this._errorText.classList.remove(this._data.errorClass);
  }

  /**Return true if the input-element has invalid input*/
  _checkIfInvalid(inputElement) {
    return !inputElement.validity.valid;
  }

  /**Return true if some of chosen input-elements have invalid input*/
  _hasInvalidInput() {
    return this._inputElements.some(this._checkIfInvalid);
  }

  /**Activate submit-button*/
  _activateButton() {
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  /**Deactivate submit-button*/
  _deactivateButton() {
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    this._buttonElement.classList.add(this._data.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  /**Set button state, depending on valididty of corresponding inputs*/
  _setButtonState() {
    if (this._hasInvalidInput()) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  }

  /**Set error-message state, depending on validity of the corresponding element*/
  _checkInputValidity(inputElement) {
    if (this._checkIfInvalid(inputElement)) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**Validate the chosen formElement*/
  validateForm() {
    this._setButtonState();
    this._inputElements.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
  }

  /**Reset the chosen formElement validation results*/
  resetValidation() {
    this._deactivateButton();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  /**Enable validation*/
  enableValidation() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._setButtonState();
      });
    });
  }
}
