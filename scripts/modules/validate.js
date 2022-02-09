const showInputError = (formElement, inputElement, props) => {
  inputElement.classList.add(props.inputErrorClass);
  const errorText = formElement.querySelector(`.popup-box__error_${inputElement.id}`);
  errorText.textContent = inputElement.validationMessage
  errorText.classList.add(props.errorClass);
};/*Show input-error message*/

const hideInputError = (formElement, inputElement, props) => {
  inputElement.classList.remove(props.inputErrorClass);
  const errorText =  formElement.querySelector(`.popup-box__error_${inputElement.id}`);
  errorText.textContent = ""
  errorText.classList.remove(props.errorClass);
};/*Hide input-error message*/

const isInvalid = (inputElement) => {
  return !inputElement.validity.valid;
};/*Return true if the input-element has invalid input*/

const hasInvalidInput = (inputElements) => {
  return inputElements.some(isInvalid);
};/*Return true if some of chosen input-elements have invalid input*/

const activateButton = (formElement, props) => {
  const buttonElement = formElement.querySelector(props.submitButtonSelector);
  buttonElement.classList.remove(props.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", true);
};/*Activate button*/

const deactivateButton = (formElement, props) => {
  const buttonElement = formElement.querySelector(props.submitButtonSelector)
  buttonElement.classList.add(props.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}/*Deactivate button*/

const setButtonState = (formElement, props) => {
  const inputElements = Array.from(formElement.querySelectorAll(props.inputSelector))
  if (hasInvalidInput(inputElements)) {
    deactivateButton(formElement, props);
  } else {
    activateButton(formElement, props);
  };
};/*Set button state corresponding to valididty of corresponding inputs*/

const checkInputValidity = (formElement, inputElement, props) => {
  if (isInvalid(inputElement)) {
    showInputError(formElement, inputElement, props);
  } else {
    hideInputError(formElement, inputElement, props);
  }
};/*Set error-message state, depending on validity of the corresponding element*/

export const validateForm = (formElement, props) => {
  setButtonState(formElement, props);
  const inputElements = Array.from(formElement.querySelectorAll(props.inputSelector));
  inputElements.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, props);
  });
};/*Validate the chosen formElement*/

export const resetValidation = (formElement, props) => {
  deactivateButton(formElement, props);
  const inputFields = Array.from(formElement.querySelectorAll(props.inputSelector));
  inputFields.forEach((inputElement) => {
    hideInputError(formElement, inputElement, props);
  });
};/*Reset the chosen formElement validation results*/

const setEventListeners = (formElement, props) => {
  formElement.addEventListener("input", () => {setButtonState(formElement, props)})
  const inputElements = Array.from(formElement.querySelectorAll(props.inputSelector));
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {checkInputValidity(formElement, inputElement, props)});
  });
};/*Set event listeners for validation*/

const enableValidation = (props) => {
  const formElements = Array.from(document.querySelectorAll(props.formSelector));
  formElements.forEach((formElement) => {
    setEventListeners(formElement, props);
  });
};
enableValidation(validationSettings);/*Enable validation for all formElements*/
