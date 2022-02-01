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
////////// Popup forms inputs
//////////// Edit-profile inputs
const userNameToSet = popupEditProfile.querySelector(".popup-box__input_type_name");
const userJobToSet = popupEditProfile.querySelector(".popup-box__input_type_job");
//////////// Add-card inputs
const cardAlttoSet = popupAddCard.querySelector(".popup-box__input_type_title");
const cardSrctoSet = popupAddCard.querySelector(".popup-box__input_type_link");
////////// Popup forms submit-buttons
//////////// Edit-profile submit-button
const buttonSubmitEditProfile = popupEditProfile.querySelector(validationSettings.submitButtonSelector);
//////////// Add-card submit-button
const buttonSubmitAddCard = popupAddCard.querySelector(validationSettings.submitButtonSelector);

//// ARRAYS AND OBJECTS
const popupBoxes = document.querySelectorAll(popupSelector);
const popupsCloseButtons = document.querySelectorAll(".close-button");

// FUNCTIONS
const setImageAttributes = (image, attrs) => {
  image.setAttribute("alt", attrs.alt);
  image.setAttribute("src", attrs.src);
};/*Set multiple attributes for the chosen img element*/

const createNewCard = (newCardAttributes) => {
  const newCard = newCardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector(newCardTitleSelector);
  const newCardImage = newCard.querySelector(newCardImageSelector);
  const cardDeletButton = newCard.querySelector(buttonDeleteSelector);
  const cardLikeButton = newCard.querySelector(buttonLikeSelector);

  newCardTitle.textContent = newCardAttributes.alt;
  setImageAttributes(newCardImage, newCardAttributes);
  cardDeletButton.addEventListener("click", (evt) => {deleteElement(evt.target, cardSelector)});
  cardLikeButton.addEventListener("click", (evt) => {evt.target.classList.toggle(buttonLikeActiveClass)});
  newCardImage.addEventListener("click", (evt) => {openTargetImagePopup(evt.target)});
  return newCard
}; /*Create a new card && add it to cardGallery*/

const addDefaultCards = () => {
  initialCards.forEach(function (card) {
    const newCard = createNewCard({ alt: card.name, src: card.link });
    cardGallery.append(newCard);
  });
};
addDefaultCards(); /*Create 6 default cards from the initialCards array and add them to the cardGallery*/

const setUserDataSet = () => {
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
}/*Provide user info for Profile*/

const setProfileEditFields = () => {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};/*Set profileEdit inputs*/

const openTargetImagePopup = (targetImage) => {
  const image = popupImage.querySelector(popupImageImageSelector);
  const subtitle = popupImage.querySelector(popupSubtitleSelector);
  const subtitleInfo = targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent;
  subtitle.textContent = subtitleInfo;
  const popupImageAttributes = {};
  popupImageAttributes["alt"] = targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent,
  popupImageAttributes["src"] = targetImage.closest(cardSelector).querySelector(newCardImageSelector).src
  setImageAttributes(image, popupImageAttributes);
  openPopup(popupImage);
};/*Open popup with the corresponding image*/

//// Event-listeners settings
import { validateForm, resetValidation } from "./modules/validation.js";

const openPopup = (popupWrapper) => {
  popupWrapper.classList.add(popupOpenclass);
};/*Open the chosen popup-box*/

const closePopup = (popupWrapper) => {
  popupWrapper.classList.remove(popupOpenclass);
};/*close the chosen popup-box*/

const deleteElement = (button, parentClassSelector) => {
  const parent = button.closest(parentClassSelector);
  parent.remove();
};/*Delete a button's corresponding element*/

const resetForm = (parent) => {
  if (parent !== popupImage) {
    const popupForm = parent.querySelector(validationSettings.formSelector)
    popupForm.reset();
  };
};/*Reset the chosen form*/

const resetAndClosePopup = (parent) => {
  if (parent.classList.contains(popupOpenclass)) {
    resetForm(parent);
    closePopup(parent);
  }
};/*Reset the chosen form and close its parent popup*/

const handleOpenEditProfile = () => {
  setProfileEditFields();
  openPopup(popupEditProfile);
  validateForm(popupEditProfile, validationSettings);
};/*Profile edit-button event-handler*/
buttonEditProfile.addEventListener("click", handleOpenEditProfile); /*Listen to Profile edit-button click event*/

const handleOpenAddCard = () => {
  openPopup(popupAddCard);
  resetValidation(popupAddCard, validationSettings);
};/*Profile add-button event-handler*/
buttonAddCard.addEventListener("click", handleOpenAddCard); /*Listen to Profile add-button click event*/

const handleEscKey = (evt, popup) => {
  if (evt.key == "Escape") {
    resetAndClosePopup(popup);
  };
};/*Escape-key keydown event-handler for popup*/

const handleEscKeyForAllPopups = (evt) => {
  const popups = Array.from(popupBoxes)
  popups.forEach((popup) => {
    handleEscKey(evt, popup);
  });
  document.removeEventListener("keydown", (evt) => {handleEscKeyForAllPopups(evt)})
};/*Escape-key keydown event-handler for all popups*/
document.addEventListener("keydown", (evt) => {handleEscKeyForAllPopups(evt)})/*Listen to document escape-key keydown event*/

document.addEventListener("click", (evt) => {resetAndClosePopup(evt.target)});/*Listen to click outside formElement events*/

const handlePopupCloseButton = (button) => {
  resetAndClosePopup(button.closest(popupSelector))
};/*Popup close-button event-handler*/

const setButtonsCloseEventListener = () => {
  popupsCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {handlePopupCloseButton(button)});
  });
};/*All popups' close-buttons event-handler*/
setButtonsCloseEventListener(); /*Listen to all popups' close-buttons click events*/

const handlePopupEditSubmit = () => {
  setUserDataSet();
  resetAndClosePopup(popupEditProfile);
};/*Update Profile user info from profileEdit inputs data */
buttonSubmitEditProfile.addEventListener("click", /*() => {*/handlePopupEditSubmit/*()}*/);
/*Listen to Edtt-Profile form submit button click event*/

const handleAddCardSubmit = () => {
  const newCard = createNewCard({ alt: cardAlttoSet.value, src: cardSrctoSet.value });
  cardGallery.prepend(newCard);
  resetAndClosePopup(popupAddCard);
};/*Create new card from addCard inputs data*/
buttonSubmitAddCard.addEventListener("click", /*() => {*/handleAddCardSubmit/*()}*/);
/*Listen to Add-Card form submit button click event*/


