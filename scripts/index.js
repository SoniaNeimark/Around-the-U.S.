import { validateForm, resetValidation } from "./modules/validate.js";

// NODE ELEMENTS
//// Profile Section
const profileSection = document.querySelector(".profile")
const buttonEditProfile = profileSection.querySelector(".edit-button")
const buttonAddCard = profileSection.querySelector(".add-button")
const userNameSet = profileSection.querySelector(".profile__name");
const userJobSet = profileSection.querySelector(".profile__profession");
//// Elements Section
const cardGallery = document.querySelector(".elements__cards");
const newCardTemplate = document.querySelector("#elements__card");
//// Popups
////// Popup wrappers
const popupEditProfile =  document.querySelector("#edit");
const popupAddCard = document.querySelector("#add");
const popupImage = document.querySelector("#image");
//////// Popup forms
////////// Edit-profile inputs
const userNameToSet = popupEditProfile.querySelector(".popup-box__input_type_name");
const userJobToSet = popupEditProfile.querySelector(".popup-box__input_type_job");
////////// Add-card inputs
const cardAlttoSet = popupAddCard.querySelector(".popup-box__input_type_title");
const cardSrctoSet = popupAddCard.querySelector(".popup-box__input_type_link");

// FUNCTIONS
const setImageAttributes = (image, attrs) => {
  image.setAttribute("alt", attrs.title);
  image.setAttribute("src", attrs.url);
};/*Set multiple attributes for the chosen img element*/

const createNewCard = (newCardAttributes) => {
  const newCard = newCardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector(newCardTitleSelector);
  const newCardImage = newCard.querySelector(newCardImageSelector);
  const cardDeletButton = newCard.querySelector(buttonDeleteSelector);
  const cardLikeButton = newCard.querySelector(buttonLikeSelector);

  newCardTitle.textContent = newCardAttributes.title;
  setImageAttributes(newCardImage, newCardAttributes);
  cardDeletButton.addEventListener("click", (evt) => {deleteElement(evt.target, cardSelector)});
  cardLikeButton.addEventListener("click", (evt) => {evt.target.classList.toggle(buttonLikeActiveClass)});
  newCardImage.addEventListener("click", (evt) => {handleOpenTargetImagePopup(evt.target)});
  return newCard
}; /*Create a new card && add it to cardGallery*/

const addDefaultCards = () => {
  initialCards.forEach(function (card) {
    const newCard = createNewCard({ title: card.name, url: card.link });
    cardGallery.append(newCard);
  });
};
addDefaultCards(); /*Create 6 default cards from the initialCards array and add them to the cardGallery*/

const handleOpenTargetImagePopup = (targetImage) => {
  const image = popupImage.querySelector(popupImageImageSelector);
  const subtitle = popupImage.querySelector(popupSubtitleSelector);
  subtitle.textContent = targetImage.alt;
  setImageAttributes(image, { title: targetImage.alt, url: targetImage.src });
  openPopup(popupImage);
  setPopupEventListeners(popupImage);
};/*Open popup with the corresponding image*/

const setUserDataSet = () => {
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
}/*Provide user info for Profile*/

const setProfileEditFields = () => {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};/*Set profileEdit inputs*/

const openPopup = (popupWrapper) => {
  popupWrapper.classList.add(popupOpenclass);
};/*Open the chosen popup-box*/

const closePopup = (popupWrapper) => {
  popupWrapper.classList.remove(popupOpenclass);
};/*close the chosen popup-box*/

const resetForm = (formContainer) => {
    const popupForm = formContainer.querySelector("form")
    popupForm.reset();
};/*Reset the chosen form*/

const deleteElement = (button, parentClassSelector) => {
  const parent = button.closest(parentClassSelector);
  parent.remove();
};/*Delete button's corresponding element*/

//// Event-handlers
const handlePopupShutDown = (popup) => {
  if (popup.querySelector("form")) {
    resetForm(popup);
  }
  closePopup(popup);
};/*Shut down the chosen popup properly*/

const handleOpenEditProfile = () => {
  setProfileEditFields();
  openPopup(popupEditProfile);
  validateForm(popupEditProfile, validationSettings);
  if (popupEditProfile.classList.contains(popupOpenclass)) {
    setPopupEventListeners(popupEditProfile);
  }
};/*Profile edit-button event-handler*/
buttonEditProfile.addEventListener("click", handleOpenEditProfile); /*Listen to Profile edit-button click event*/

const handleOpenAddCard = () => {
  openPopup(popupAddCard);
  resetValidation(popupAddCard, validationSettings);
  setPopupEventListeners(popupAddCard);
};/*Profile add-button event-handler*/
buttonAddCard.addEventListener("click", handleOpenAddCard); /*Listen to Profile add-button click event*/

const handleAddCardSubmit = () => {
  const newCard = createNewCard({ title: cardAlttoSet.value, url: cardSrctoSet.value });
  cardGallery.prepend(newCard);
};/*Create new card from addCard inputs data*/

const setPopupEventListeners = (popup) => {
  const buttonClose = popup.querySelector(buttonCloseSelector);
  const buttonSubmit = popup.querySelector(validationSettings.submitButtonSelector)

  const removeAllEventListeners = () => {
    document.removeEventListener("keydown", handleEscKey);
    document.removeEventListener("click", handleDocumentOutsidePopup);
    buttonClose.removeEventListener("click", handlePopupCloseButton);
    if (popup.querySelector("form")) {
      buttonSubmit.removeEventListener("click", handleSubmitButtons);
    }
  };

  const handleDocumentOutsidePopup = (evt) => {
    if (evt.target.classList.contains(popupOpenclass)) {
      handlePopupShutDown(evt.currentTarget.querySelector(popupOpenedSelector));
      removeAllEventListeners();
    }
  };

  const handlePopupCloseButton = (evt) => {
    handlePopupShutDown(evt.target.closest(popupOpenedSelector))
    removeAllEventListeners();
  };

  const handleEscKey = (evt) => {
    if (evt.key == "Escape" && evt.currentTarget.querySelector(popupOpenedSelector)) {
      handlePopupShutDown(evt.currentTarget.querySelector(popupOpenedSelector));
      removeAllEventListeners()
    };
  };

  const handleSubmitButtons = (evt) => {
      if (evt.target.closest(popupSelector).classList.contains(popupEditProfileClass)) {
        setUserDataSet()
      } else if (evt.target.closest(popupSelector).classList.contains(popupAddCardClass)) {
        handleAddCardSubmit();
      };
      handlePopupShutDown(evt.target.closest(popupSelector));
      removeAllEventListeners();
  };

  document.addEventListener("keydown", handleEscKey);
  document.addEventListener("click", handleDocumentOutsidePopup);
  buttonClose.addEventListener("click", handlePopupCloseButton);
  const setButonSubmitEventListener = (popup) => {
    if (popup.querySelector("form")) {
      buttonSubmit.addEventListener("click", handleSubmitButtons)
    }
  };
  setButonSubmitEventListener(popup);
};/*Set event listeners for the chosen popup*/

