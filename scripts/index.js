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
const cardAltToSet = popupAddCard.querySelector(".popup-box__input_type_title");
const cardSrcToSet = popupAddCard.querySelector(".popup-box__input_type_link");

// FUNCTIONS
const setImageAttributes = (image, attrs) => {
  image.setAttribute("alt", attrs.title);
  image.setAttribute("src", attrs.url);
};/*Set multiple attributes for the chosen img element*/

const createNewCard = (newCardAttributes) => {
  const newCard = newCardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector(newCardTitleSelector);
  const newCardImage = newCard.querySelector(newCardImageSelector);
  const cardDeleteButton = newCard.querySelector(buttonDeleteSelector);
  const cardLikeButton = newCard.querySelector(buttonLikeSelector);

  newCardTitle.textContent = newCardAttributes.title;
  setImageAttributes(newCardImage, newCardAttributes);

  cardDeleteButton.addEventListener("click", (evt) => {
    deleteElement(evt.target, cardSelector);
  });

  cardLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle(buttonLikeActiveClass)
  });

  newCardImage.addEventListener("click", (evt) => {
    handleOpenTargetImagePopup(evt.target)
  });

  return newCard;
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
  const buttonClose = popupWrapper.querySelector(buttonCloseSelector);
  popupWrapper.classList.add(popupOpenClass); //defined constants.js line 30
  document.addEventListener("keydown", handleEscKey)
  popupWrapper.addEventListener("mousedown", handleClickOutsidePopup);
  buttonClose.addEventListener("click", handleButtonClose);
};/*Open the chosen popup-box*/

const closePopup = (popupWrapper) => {
  const buttonClose = popupWrapper.querySelector(buttonCloseSelector);
  popupWrapper.classList.remove(popupOpenClass);
  document.removeEventListener("keydown", handleEscKey);
  popupWrapper.removeEventListener("mousedown", handleClickOutsidePopup);
  buttonClose.removeEventListener("click", handleButtonClose);
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
};/*Open popup with the corresponding image*/

const handleOpenEditProfile = () => {
  resetForm(popupEditProfile);
  openPopup(popupEditProfile);
  setProfileEditFields();
  validateForm(popupEditProfile, validationSettings);
};/*Profile edit-button event-handler*/
buttonEditProfile.addEventListener("click", handleOpenEditProfile); /*Listen to Profile edit-button click event*/

const handleOpenAddCard = () => {
  resetForm(popupAddCard)
  openPopup(popupAddCard);
  resetValidation(popupAddCard, validationSettings);
};/*Profile add-button event-handler*/
buttonAddCard.addEventListener("click", handleOpenAddCard); /*Listen to Profile add-button click event*/

const handleEscKey = (evt) => {
  if (evt.key == "Escape") {
    closePopup(document.querySelector(popupOpenedSelector));
  };
};

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
  closePopup(popupEditProfile);
}
popupEditProfileForm.addEventListener("submit", handleEditProfileSubmit);

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const newCard = createNewCard({ title: cardAltToSet.value, url: cardSrcToSet.value });
  cardGallery.prepend(newCard);
  closePopup(popupAddCard);
};
popupAddCardForm.addEventListener("submit", handleAddCardSubmit);

const handleClickOutsidePopup = (evt) => {
  if (evt.target.classList.contains(popupOpenClass)) {
    closePopup(evt.target);
  }
};

const handleButtonClose = (evt) => {
  closePopup(evt.currentTarget.closest(popupSelector))
}
