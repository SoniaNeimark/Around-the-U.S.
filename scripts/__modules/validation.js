
const showInputError = ({ inputElement, inputErrorClass, errorClass }) => {
  inputElement.classList.add(inputErrorClass);
  const errorText = document.querySelector(`.popup-box__error_${inputElement.id}`);
  errorText.textContent = inputElement.validationMessage
  errorText.classList.add(errorClass);
};/*Show input-error message*/

const hideInputError = ({ inputElement, inputErrorClass, errorClass }) => {
  inputElement.classList.remove(inputErrorClass);
  const errorText = document.querySelector(`.popup-box__error_${inputElement.id}`);
  errorText.classList.remove(errorClass);
};/*Hide input-error message*/

const isInvalid = (inputElement) => {
  return !inputElement.validity.valid;
};/*Return true if the input-element has invalid input*/

const hasInvalidInput = (inputElements) => {
  return inputElements.some(isInvalid);
};/*Return true if some of chosen input-elements have invalid input*/

const activateButton = ({ buttonElement, inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled", true);
};/*Activate button*/

const deactivateButton = ({ buttonElement, inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}/*Deactivate button*/

const setButtonState = ({ inputElements, buttonElement, inactiveButtonClass }) => {
  if (hasInvalidInput(inputElements)) {
    deactivateButton({ buttonElement, inactiveButtonClass });
  } else {
    activateButton({ buttonElement, inactiveButtonClass });
  };
};/*Set button state corresponding to valididty of corresponding inputs*/

const checkInputValidity = ({ inputElement, inputErrorClass, errorClass }) => {
  if (isInvalid(inputElement)) {
    showInputError({ inputElement, inputErrorClass, errorClass });
  } else {
    hideInputError({ inputElement, inputErrorClass, errorClass });
  }
};/*Set error-message state, depending on validity of the corresponding element*/

export const setValidation = ({ inputElements, buttonElement, inactiveButtonClass, inputErrorClass, errorClass }) => {
  setButtonState({ inputElements, buttonElement, inactiveButtonClass });
  inputElements.forEach((inputElement) => {
    checkInputValidity({ inputElement, inputErrorClass, errorClass });
  });
};/*Set multiple validation settings for popup-forms*/

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formElements = document.querySelectorAll(formSelector);
  formElements.forEach((formElement) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const fieldset = formElement.querySelector(formFieldsetSelector);
    const inputElements = Array.from(fieldset.querySelectorAll(inputSelector));

    fieldset.addEventListener("input", () => {
      setValidation({
        inputElements: inputElements,
        buttonElement: buttonElement,
        inactiveButtonClass: inactiveButtonClass,
        inputErrorClass: inputErrorClass,
        errorClass: errorClass
      });
    });

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      fieldset.removeEventListener("input", () => {
        setValidation({
          inputElements: inputElements,
          buttonElement: buttonElement,
          inactiveButtonClass: inactiveButtonClass,
          inputErrorClass: inputErrorClass,
          errorClass: errorClass
        });
      });
      formElement.reset();
    });
  });
};
enableValidation(valedationSettings);/*Enable multiple validation settings for popup-forms*/

export const resetForm = (popup) => {
  const formElement = popup.querySelector(valedationSettings.formSelector)
  const buttonElement = popup.querySelector(valedationSettings.submitButtonSelector);
  const fieldset = formElement.querySelector(".popup-box__fieldset");
  const inputElements = Array.from(fieldset.querySelectorAll(valedationSettings.inputSelector));

  setValidation({
    inputElements: inputElements,
    buttonElement: buttonElement,
    inactiveButtonClass: valedationSettings.inactiveButtonClass,
    inputErrorClass: valedationSettings.inputErrorClass,
    errorClass: valedationSettings.errorClass
  });
};/*Reset the chosen popup-form after submitting or closing*/
