import logoSrc from "../images/logo/logo.svg";
import profileSrc from "../images/profile/profile_image.png";
import "./index.css";
import { initialCards } from "../scripts/utils/cards.js";
import { validationSettings, pageSettings, documentSettings } from "../scripts/utils/settings.js";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js";
const logo = document.getElementById("logo");
logo.src = logoSrc;
const profileImage = document.getElementById("profile");
profileImage.src = profileSrc;
const thisPageSettings = { ...documentSettings, ...pageSettings, ...validationSettings };

//CARD GALLERY
/**Create a new card, using provided data*/
const popupWithImage = new PopupWithImage(thisPageSettings, thisPageSettings.popupImageSelector);

const createCard = ({ title, url }, data) => {
  const newCard = new Card({ title, url }, data, () => {
    popupWithImage.open(newCard._cardImage);
  });
  return newCard.generateCard();
};

/**Create 6 default cards from the initialCards array and add them to the cardGallery*/
const cardsGallery = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardsGallery.addItem(createCard({
      title: item.name,
      url: item.link,
      }, thisPageSettings));
  }
}, thisPageSettings.cardsGallerySelector);
cardsGallery.renderItems();

//PROFILE SECTION
const userInfo = new UserInfo(thisPageSettings);

//POPUP FORMS
const profileFormValidator = new FormValidator(thisPageSettings, thisPageSettings.popupEditProfileSelector);
const cardAddFormValidator = new FormValidator(thisPageSettings, thisPageSettings.popupAddCardSelector);
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

const popupEdit = new PopupWithForm(thisPageSettings,
  thisPageSettings.popupEditProfileSelector,
  (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    nameInfo: popupEdit.getInputValues().name,
    jobInfo: popupEdit.getInputValues().about
  });
  popupEdit.close();
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(thisPageSettings,
  thisPageSettings.popupAddCardSelector, (evt) => {
  evt.preventDefault();
  cardsGallery.addItem(createCard({
    title: popupAdd.getInputValues().title,
    url: popupAdd.getInputValues().url
  }, thisPageSettings));
  popupAdd.close();
});
  popupAdd.setEventListeners();

/**Profile edit-button event-handler*/
document.querySelector(thisPageSettings.buttonEditProfileSelector).addEventListener("click", () => {
  popupEdit.open();
  document.querySelector(thisPageSettings.userNameToSetSelector).value = userInfo.getUserInfo().name;
  document.querySelector(thisPageSettings.userJobToSetSelector).value = userInfo.getUserInfo().job;
  profileFormValidator.validateForm();
});

/**Profile add-button event-handler*/
document.querySelector(thisPageSettings.buttonAddCardSelector).addEventListener("click", () => {
  popupAdd.open();
  cardAddFormValidator.resetValidation();
});
