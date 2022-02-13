import { Card } from "./modules/Card.js";
import { FormValidator } from "./modules/FormValidator.js";

//CARD GALLERY
/**Create a new card, using provided data*/
const createCard = (data) => {
  return new Card(data, pageSettings.cardTemplateSelector).generateCard();
};

/**Create 6 default cards from the initialCards array and add them to the cardGallery*/
initialCards.forEach((card) => {
  pageSettings.cardGallery.append(createCard({
    title: card.name,
    url: card.link
  }));
});

//POPUP FORMS
const profileFormValidator = new FormValidator(validationSettings, pageSettings.popupEditProfile);
const cardAddFormValidator = new FormValidator(validationSettings, pageSettings.popupAddCard);
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

/**Set profileEdit form inputs*/
const setProfileEditFields = () => {
  pageSettings.userNameToSet.value = pageSettings.userNameSet.textContent;
  pageSettings.userJobToSet.value = pageSettings.userJobSet.textContent;
};

/**Set user data in profile section*/
const setProfileData = () => {
  pageSettings.userNameSet.textContent = pageSettings.userNameToSet.value;
  pageSettings.userJobSet.textContent = pageSettings.userJobToSet.value;
};

/**Profile edit-button event-handler*/
const handleOpenEditProfile = () => {
  resetForm(pageSettings.popupEditProfile);
  openPopup(pageSettings.popupEditProfile);
  setProfileEditFields();
  profileFormValidator.validateForm();
};

/**Profile add-button event-handler*/
const handleOpenAddCard = () => {
  resetForm(pageSettings.popupAddCard);
  openPopup(pageSettings.popupAddCard);
  cardAddFormValidator.resetValidation();
};

/**Profile edit-profile form event-handler*/
const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();
  setProfileData();
  closePopup(pageSettings.popupEditProfile);
};

/**Profile add-card form event-handler*/
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  pageSettings.cardGallery.prepend(createCard({
    title: pageSettings.cardAltToSet.value,
    url: pageSettings.cardSrcToSet.value
  }));
  closePopup(pageSettings.popupAddCard);
};

pageSettings.buttonEditProfile.addEventListener("click", handleOpenEditProfile);
pageSettings.buttonAddCard.addEventListener("click", handleOpenAddCard);
pageSettings.popupAddCardForm.addEventListener("submit", handleAddCardSubmit);
pageSettings.popupEditProfileForm.addEventListener("submit", handleEditProfileSubmit);
