// VALIDATION
const valedationSettings = {
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__button",
  inactiveButtonClass: "popup-box__button_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible"
};/*Configuration Object for validation*/

const showInputError = (props) => {
  const { inputElement, inputErrorClass, errorClass } = props;
  inputElement.classList.add(inputErrorClass);
  const errorText = inputElement.nextElementSibling;
  errorText.classList.add(errorClass);
};/*Show input-error message*/

const hideInputError = (props) => {
  const { inputElement, inputErrorClass, errorClass } = props;
  inputElement.classList.remove(inputErrorClass);
  const errorText = inputElement.nextElementSibling;
  errorText.classList.remove(errorClass);
};/*Hide input-error message*/

const isInvalid = (inputElement) => {
  return !inputElement.validity.valid;
};/*Return true if the input-element has invalid input*/

const hasInvalidInput = (inputElements) => {
  return inputElements.some(isInvalid);
};/*Return true if some of chosen input-elements have invalid input*/

const activateButton = (props) => {
  const { buttonElement, inactiveButtonClass } = props;
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled", true);
};/*Activate button*/

const deactivateButton = (props) => {
  const { buttonElement, inactiveButtonClass } = props;
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}/*Deactivate button*/

const setButtonState = (props) => {
  const { inputElements, buttonElement, inactiveButtonClass } = props;
  if (hasInvalidInput(inputElements)) {
    deactivateButton({ buttonElement, inactiveButtonClass });
  } else {
    activateButton({ buttonElement, inactiveButtonClass });
  };
};/*Set button state corresponding to valididty of corresponding inputs*/

const checkInputValidity = (props) => {
  const { inputElement, inputErrorClass, errorClass } = props;
  if (isInvalid(inputElement)) {
    showInputError({ inputElement, inputErrorClass, errorClass });
  } else {
    hideInputError({ inputElement, inputErrorClass, errorClass });
  }
};/*Set error-message state, depending on validity of the corresponding element*/

const setEventlisteners = (props) => {
  const {
    inputElements,
    buttonElement,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = props;
  setButtonState({ inputElements, buttonElement, inactiveButtonClass });
  inputElements.forEach((inputElement) => {
    checkInputValidity({ inputElement, inputErrorClass, errorClass });
  });
};/*Set event-listeners for validation*/

const enableValidation = (settings) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = settings || {};

  const formElements = document.querySelectorAll(formSelector);
  formElements.forEach((formElement) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const fieldset = formElement.querySelector(formFieldsetSelector);
    const inputElements = Array.from(fieldset.querySelectorAll(inputSelector));

    document.addEventListener("keydown", (evt) => {
      if(evt.key == "Escape") {
        removeClass(formElement.closest(popupSelector), popupOpenclass);
      };
    });

    fieldset.addEventListener("input", () => {
      setEventlisteners({
        inputElements: inputElements,
        buttonElement: buttonElement,
        inactiveButtonClass: inactiveButtonClass,
        inputErrorClass: inputErrorClass,
        errorClass: errorClass
      });
    });

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (formElement.name == "profileForm") {
        setPopupEditSubmit();
      } else {
        setAddCardSubmit();
      };

      fieldset.removeEventListener("input", () => {
        setEventlisteners({
          inputElements: inputElements,
          buttonElement: buttonElement,
          inactiveButtonClass: inactiveButtonClass,
          inputErrorClass: inputErrorClass,
          errorClass: errorClass
        });
      });
      formElement.reset();
      document.removeEventListener("keydown", (evt) => {
        if(evt.key == "Escape") {
          removeClass(formElement.closest(popupSelector), popupOpenclass);
        };
      });
    });
  });
};
enableValidation(valedationSettings);
