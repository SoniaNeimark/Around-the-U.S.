import logoSrc from "./images/logo/logo.svg";
import profileSrc from "./images/profile/profile_image.png";
import "./styles/index.css";
import { initialCards } from "./scripts/utils/cards.js";
import { validationSettings, pageSettings } from "./scripts/utils/settings.js";
import Section from "./scripts/components/Section.js";
import Card from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js"
import PopupWithForm from "./scripts/components/PopupWithForm.js";
const logo = document.getElementById("logo");
logo.src = logoSrc;
const profileImage = document.getElementById("profile");
profileImage.src = profileSrc;
const {
  cardTemplateSelector,
  cardsGallerySelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  userJobSetSelector,
  userNameSetSelector,
  userJobToSetSelector,
  userNameToSetSelector,
  buttonEditProfileSelector,
  buttonAddCardSelector,
} = pageSettings;

//CARD GALLERY
/**Create a new card, using provided data*/
const popup = new PopupWithImage(popupImageSelector);

const createCard = (data) => {
  const newCard = new Card(data, cardTemplateSelector, () => {
    popup.open(newCard._cardImage);
  });
  return newCard.generateCard();
};

/**Create 6 default cards from the initialCards array and add them to the cardGallery*/
const cardsGallery = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardsGallery.addItem(createCard({
      title: item.name,
      url: item.link
    }));
  }
}, cardsGallerySelector);
cardsGallery.renderItems();

//PROFILE SECTION
const userInfo = new UserInfo({
  nameSelector: userNameSetSelector,
  jobSelector: userJobSetSelector
});

//POPUP FORMS
const profileFormValidator = new FormValidator(validationSettings, popupEditProfileSelector);
const cardAddFormValidator = new FormValidator(validationSettings, popupAddCardSelector);
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

const popupEdit = new PopupWithForm(popupEditProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    nameInfo: popupEdit.getInputValues()[0],
    jobInfo: popupEdit.getInputValues()[1]
  });
  popupEdit.close();
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  cardsGallery.addItem(createCard({
    title: popupAdd.getInputValues()[0],
    url: popupAdd.getInputValues()[1]
  }));
  popupAdd.close();
});
popupAdd.setEventListeners();

/**Profile edit-button event-handler*/
document.querySelector(buttonEditProfileSelector).addEventListener("click", () => {
  popupEdit.open();
  userInfo.setUserInputs(userNameToSetSelector, userJobToSetSelector);
  profileFormValidator.validateForm();
});

/**Profile add-button event-handler*/
document.querySelector(buttonAddCardSelector).addEventListener("click", () => {
  popupAdd.open();
  cardAddFormValidator.resetValidation();
});
