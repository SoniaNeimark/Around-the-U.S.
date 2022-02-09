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
////// Popups Nodelist
const popups = document.querySelectorAll(popupSelector)
////// Popup wrappers
const popupEditProfile = document.querySelector("#edit");
const popupAddCard = document.querySelector("#add");
const popupImage = document.querySelector("#image");
//////// Popup forms
const popupEditProfileForm = popupEditProfile.querySelector(validationSettings.formSelector)
const popupAddCardForm = popupAddCard.querySelector(validationSettings.formSelector)
////////// Edit-profile form
//////////// Edit-profile form inputs
const userNameToSet = popupEditProfile.querySelector(".popup-box__input_type_name");
const userJobToSet = popupEditProfile.querySelector(".popup-box__input_type_job");
////////// Add-card form
//////////// Add-card form inputs
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
}; /*Create a new card*/

const addDefaultCards = () => {
  initialCards.forEach(function (card) {
    const newCard = createNewCard({ title: card.name, url: card.link });
    cardGallery.append(newCard);
  });
};
addDefaultCards(); /*Create 6 default cards from the initialCards array and add them to the cardGallery*/

const deleteElement = (button, parentClassSelector) => {
  const parent = button.closest(parentClassSelector);
  parent.remove();
};/*Delete button's corresponding element*/

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

const setProfileEditFields = () => {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};/*Set profileEdit form inputs*/

//// Event-handlers
const handleOpenTargetImagePopup = (targetImage) => {
  const image = popupImage.querySelector(popupImageImageSelector);
  const subtitle = popupImage.querySelector(popupSubtitleSelector);
  subtitle.textContent = targetImage.alt;
  setImageAttributes(image, { title: targetImage.alt, url: targetImage.src });
  openPopup(popupImage);
  document.addEventListener("keydown", handleEscKey)
};/*Open popup with the corresponding image*/

const handleOpenEditProfile = () => {
  setProfileEditFields();
  openPopup(popupEditProfile);
  validateForm(popupEditProfile, validationSettings);
  document.addEventListener("keydown", handleEscKey)
};/*Profile edit-button event-handler*/
buttonEditProfile.addEventListener("click", handleOpenEditProfile); /*Listen to Profile edit-button click event*/

const handleOpenAddCard = () => {
  openPopup(popupAddCard);
  resetValidation(popupAddCard, validationSettings);
  document.addEventListener("keydown", handleEscKey)
};/*Profile add-button event-handler*/
buttonAddCard.addEventListener("click", handleOpenAddCard); /*Listen to Profile add-button click event*/

const handlePopupShutDown = (popup) => {
  if (popup.querySelector("form")) {
    resetForm(popup);
  }
  closePopup(popup);
  document.removeEventListener("keydown", handleEscKey);
};/*Shut down the chosen popup properly*/

const handleEscKey = (evt) => {
  if (evt.key == "Escape") {
    handlePopupShutDown(document.querySelector(popupOpenedSelector));
  };
};

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
  handlePopupShutDown(popupEditProfile);
}
popupEditProfileForm.addEventListener("submit", handleEditProfileSubmit);

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const newCard = createNewCard({ title: cardAlttoSet.value, url: cardSrctoSet.value });
  cardGallery.prepend(newCard);
  handlePopupShutDown(popupAddCard);
};
popupAddCardForm.addEventListener("submit", handleAddCardSubmit);

const handleClickOutsidePopup = (evt) => {
  if (evt.target.classList.contains(popupOpenclass)) {
    handlePopupShutDown(evt.target);
  }
};

const setPopupsEventListeners = () => {
  popups.forEach((popup) => {
    const buttonClose = popup.querySelector(buttonCloseSelector);
    popup.addEventListener("click", handleClickOutsidePopup);
    buttonClose.addEventListener("click", () => {handlePopupShutDown(popup)});
  });
};
setPopupsEventListeners();
