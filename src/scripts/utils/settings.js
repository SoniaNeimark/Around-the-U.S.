export const documentSettings = {
// BUTTONS
/// SELECTORS
  buttonLikeSelector: ".like-button",
  buttonDeleteSelector: ".delete-button",
  buttonCloseSelector: ".close-button",
/// CSS CLASSES
  buttonLikeActiveClass: "like-button_status_active",
  buttonDeleteActiveClass: "delete-button_visible",

// POPUPS
/// SELECTORS
  popupSelector: ".popup-box",
  popupSubtitleSelector: ".popup-box__subtitle",
  popupImageImageSelector: ".popup-box__image",
/// CSS CLASSES
  popupOpenClass: "popup-box_opened"
}

export const validationSettings = {
/// SELECTORS
  formSelector: ".popup-box__form",
  inputSelector: ".popup-box__input",
  submitButtonSelector: ".popup-box__button",
  errorHiddenSelector: ".popup-box__error",
/// CSS CLASSES
  inactiveButtonClass: "popup-box__button_disabled",
  inputErrorClass: "popup-box__input_type_error",
  errorClass: "popup-box__error_visible"
};

export const pageSettings = {
// ELEMENTS SECTION
/// SELECTORS
  cardsGallerySelector: ".elements__cards",
  cardTemplateSelector: "#elements__card",
  cardSelector: ".elements__card",
  cardImageSelector: ".elements__image",
  cardTitleSelector: ".elements__title",
  cardLikesNumberSelector: ".elements__like-number",

// PROFILE SECTION
/// SELECTORS
  userNameSetSelector: ".profile__name",
  userJobSetSelector: ".profile__profession",
  profileImageSelector: ".profile__image",
  buttonEditProfileSelector: ".edit-button",
  buttonAddCardSelector: ".add-button",
  avatarEditButtonSelector: ".avatar-edit-button",
  buttonSubmitAlertSelector: ".popup-box__button_alert",
  profileEditSubmitButtonSelector: ".popup-box__button_edit-profile",
  addCardSubmitButtonSelector: ".popup-box__button_add-card",

// POPUPS
/// SELECTORS
  popupEditProfileSelector: ".popup-box_edit-profile",
  popupEditAvatarSelector: ".popup-box_edit-avatar",
  popupAddCardSelector: ".popup-box_add-card",
  popupImageSelector: ".popup-box_image",
  popupAlertSelector: ".popup-box_alert",
  userNameToSetSelector: ".popup-box__input_type_name",
  userJobToSetSelector: ".popup-box__input_type_job",
  userAvatarToSetSelector: ".popup-box__input_type_avatarUrl"
}
