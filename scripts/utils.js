/**Set multiple attributes for the chosen img element*/
const setImageAttributes = (image, attrs) => {
  image.setAttribute("alt", attrs.title);
  image.setAttribute("src", attrs.url);
};

/**Open the chosen popup-box*/
const openPopup = (popupWrapper) => {
  const buttonClose = popupWrapper.querySelector(documentSettings.buttonCloseSelector);
  popupWrapper.classList.add(documentSettings.popupOpenClass); //defined constants.js line 30
  document.addEventListener("keydown", handleEscKey)
  popupWrapper.addEventListener("mousedown", handleClickOutsidePopup);
  buttonClose.addEventListener("click", handleButtonClose);
};

/**Close the chosen popup-box*/
const closePopup = (popupWrapper) => {
  const buttonClose = popupWrapper.querySelector(documentSettings.buttonCloseSelector);
  popupWrapper.classList.remove(documentSettings.popupOpenClass);
  document.removeEventListener("keydown", handleEscKey);
  popupWrapper.removeEventListener("mousedown", handleClickOutsidePopup);
  buttonClose.removeEventListener("click", handleButtonClose);
};

/**Reset the chosen form*/
const resetForm = (formContainer) => {
  const popupForm = formContainer.querySelector("form")
  popupForm.reset();
};

/**Set profileEdit form inputs*/
const setProfileEditFields = () => {
  pageSettings.userNameToSet.value = pageSettings.userNameSet.textContent;
  pageSettings.userJobToSet.value = pageSettings.userJobSet.textContent;
};

/**Handle close popup on "esc" keydawn*/
const handleEscKey = (evt) => {
  if (evt.key == "Escape") {
    closePopup(document.querySelector(documentSettings.popupOpenedSelector));
  };
};

/**Handle close popup on click outside*/
const handleClickOutsidePopup = (evt) => {
  if (evt.target.classList.contains(documentSettings.popupOpenClass)) {
    closePopup(evt.target);
  }
};

/**Handle close popup on close-button click*/
const handleButtonClose = (evt) => {
  closePopup(evt.currentTarget.closest(documentSettings.popupSelector))
}


