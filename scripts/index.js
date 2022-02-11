import { Card } from "./modules/Card.js";
import { FormValidator } from "./modules/FormValidator.js";

/**Create 6 default cards from the initialCards array and add them to the cardGallery*/
(() => {
  initialCards.forEach(function (card) {
    const newCardElement = new Card({ title: card.name, url: card.link }, pageSettings.cardTemplateSelector)
    const newCard = newCardElement.generateCard();
    pageSettings.cardGallery.append(newCard);
  });
})();

/**Profile edit-button event-handler*/
const handleOpenEditProfile = () => {
  resetForm(pageSettings.popupEditProfile);
  openPopup(pageSettings.popupEditProfile);
  setProfileEditFields();
  const validateForm = new FormValidator(validationSettings, pageSettings.popupEditProfile);
  validateForm.validateForm();
  validateForm.enableValidation();
  pageSettings.popupEditProfileForm.addEventListener("submit", handleEditProfileSubmit);
};

/**Profile add-button event-handler*/
const handleOpenAddCard = () => {
  resetForm(pageSettings.popupAddCard)
  openPopup(pageSettings.popupAddCard);
  const validateForm = new FormValidator(validationSettings, pageSettings.popupAddCard);
  validateForm.resetValidation()
  validateForm.enableValidation();
  pageSettings.popupAddCardForm.addEventListener("submit", handleAddCardSubmit);
};

/**Profile edit-profile form event-handler*/
const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  pageSettings.userNameSet.textContent = pageSettings.userNameToSet.value;
  pageSettings.userJobSet.textContent = pageSettings.userJobToSet.value;
  closePopup(pageSettings.popupEditProfile);
  pageSettings.popupEditProfileForm.removeEventListener("submit", handleEditProfileSubmit);
}

/**Profile add-card form event-handler*/
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardElement = new Card({ title: pageSettings.cardAltToSet.value, url: pageSettings.cardSrcToSet.value }, pageSettings.cardTemplateSelector);
  const newCard = newCardElement.generateCard();
  pageSettings.cardGallery.prepend(newCard);
  closePopup(pageSettings.popupAddCard);
  pageSettings.popupAddCardForm.removeEventListener("submit", handleAddCardSubmit);
};

/**Set event-listeners for profile edit- and add- buttons*/
(() =>{
  pageSettings.buttonEditProfile.addEventListener("click", handleOpenEditProfile);
  pageSettings.buttonAddCard.addEventListener("click", handleOpenAddCard);
})();
