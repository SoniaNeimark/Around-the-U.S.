// DOCUMENT SETTINGS
//// SELECTORS
////// Elements Section
const cardSelector = ".elements__card";
const newCardImageSelector = ".elements__image";
const newCardTitleSelector = ".elements__title";
//////Popups
const popupSelector = ".popup-box";
const popupSubtitleSelector = ".popup-box__subtitle";
const popupImageImageSelector = ".popup-box__image";
const buttonLikeSelector = ".like-button";
const buttonDeleteSelector = ".delete-button";

//// CSS CLASSES
const popupOpenclass = "popup-box_opened";

//// NODE ELEMENTS
////// Profile Section
const buttonEditProfile = document.querySelector(".edit-button")
const buttonAddCard = document.querySelector(".add-button")
const userNameSet = document.querySelector(".profile__name");
const userJobSet = document.querySelector(".profile__profession");
////// Elements Section
const newCardTemplate = document.querySelector("#elements__card");
const cardGallery = document.querySelector(".elements__cards");
////// Popups
//////// Popup wrappers
const popupEditProfile =  document.querySelector("#edit");
const popupAddCard = document.querySelector("#add");
const popupImage = document.querySelector("#image");
////////// Popup forms
const formAddCard = popupAddCard.querySelector(".popup-box__form");
//////////// Popup forms inputs
const formFieldsetSelector = ".popup-box__fieldset";
////////////// Edit-profile inputs
const userNameToSet = popupEditProfile.querySelector(".popup-box__input_type_name");
const userJobToSet = popupEditProfile.querySelector(".popup-box__input_type_job");
////////////// Add-card inputs
const cardAlttoSet = popupAddCard.querySelector(".popup-box__input_type_title");
const cardSrctoSet = popupAddCard.querySelector(".popup-box__input_type_link");
//////////// Popup forms submit-buttons
////////////// Edit-profile submit-button
const buttonSubmitEditProfile = popupEditProfile.querySelector(".popup-box__button");
////////////// Add-card submit-button
const buttonSubmitAddCard = popupAddCard.querySelector(".popup-box__button");

//// ARRAYS AND OBJECTS
const popupsCloseButtons = document.querySelectorAll(".close-button");
const likeClasses = {
  buttonLikeActiveClass: "like-button_status_active",
  buttonLikeHoverClass: "hover-opacity",
  buttonLikeHoverSpecialClass: "hover-opacity_button_like"
};

// VALIDATION
const valedationSettings = {
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__button",
  inactiveButtonClass: "popup-box__button_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible"
};/*Configuration Object for validation*/
