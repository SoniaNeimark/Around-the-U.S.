const documentSettings = {
// CARDS BUTTONS SELECTORS
  buttonLikeSelector: ".like-button",
  buttonDeleteSelector: ".delete-button",
  buttonCloseSelector: ".close-button",
/// BUTTON LIKE ACTIVE CSS CLASS
  buttonLikeActiveClass: "like-button_status_active",

// POPUPS SELECTORS
  popupSelector: ".popup-box",
  popupOpenedSelector: ".popup-box_opened",
  popupSubtitleSelector: ".popup-box__subtitle",
  popupImageImageSelector: ".popup-box__image",
// POPUP OPEN CSS CLASS
  popupOpenClass: "popup-box_opened"
}

const validationSettings = {
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__button",
  inactiveButtonClass: "popup-box__button_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible"
};

const pageSettings = {
// PROFILE SECTION
  profileSection: document.querySelector(".profile"),

// ELEMENTS SECTION
/// SELECTORS
  cardTemplateSelector: "#elements__card",
/// SCC CLASSES
  newCardSelector: ".elements__card",
  newCardImageSelector: ".elements__image",
  newCardTitleSelector: ".elements__title",
/// NODE ELEMENTS
  cardGallery: document.querySelector(".elements__cards"),

// POPUPS
/// NODE ELEMENTS
  popupEditProfile: document.querySelector("#edit"),
  popupAddCard: document.querySelector("#add"),
  popupImage: document.querySelector("#image")
}

// New pageSettings object entries
//// PROFILE SECTION
///// NODE ELEMENTS
pageSettings.buttonEditProfile = pageSettings.profileSection.querySelector(".edit-button");
pageSettings.buttonAddCard = pageSettings.profileSection.querySelector(".add-button");
pageSettings.userNameSet = pageSettings.profileSection.querySelector(".profile__name");
pageSettings.userJobSet = pageSettings.profileSection.querySelector(".profile__profession");

//// ELEMENTS SECTION
///// NODE ELEMENTS
pageSettings.newCardTemplate = document.querySelector(pageSettings.cardTemplateSelector);

//// POPUPS
///// NODE ELEMENTS
pageSettings.popupEditProfileForm = pageSettings.popupEditProfile.querySelector(validationSettings.formSelector);
pageSettings.popupAddCardForm = pageSettings.popupAddCard.querySelector(validationSettings.formSelector);
pageSettings.userNameToSet = pageSettings.popupEditProfile.querySelector(".popup-box__input_type_name");
pageSettings.userJobToSet = pageSettings.popupEditProfile.querySelector(".popup-box__input_type_job");
pageSettings.cardAltToSet = pageSettings.popupAddCard.querySelector(".popup-box__input_type_title");
pageSettings.cardSrcToSet = pageSettings.popupAddCard.querySelector(".popup-box__input_type_link");
