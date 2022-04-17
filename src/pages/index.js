import logoSrc from "../images/logo/logo.svg";
import "./index.css";
import Api from "../scripts/components/Api.js";
import { validationSettings, pageSettings, documentSettings } from "../scripts/utils/settings.js";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { data } from "autoprefixer";
const logo = document.getElementById("logo");
logo.src = logoSrc;
const profileImage = document.getElementById("profile");
const thisPageSettings = { ...documentSettings, ...pageSettings, ...validationSettings };
const buttonEditProfile = document.querySelector(thisPageSettings.buttonEditProfileSelector);
const buttonAddCard = document.querySelector(thisPageSettings.buttonAddCardSelector);
const buttonEditAvatar = document.querySelector(thisPageSettings.avatarEditButtonSelector)
const profileNameInput = document.querySelector(thisPageSettings.userNameToSetSelector);
const profileJobInput = document.querySelector(thisPageSettings.userJobToSetSelector);
const profileEditSubmitButton = document.querySelector(thisPageSettings.profileEditSubmitButtonSelector)
const avatarEditSubmitButton = document.querySelector(thisPageSettings.avatarEditSubmitButtonSelector)
const addCardSubmitButton = document.querySelector(thisPageSettings.addCardSubmitButtonSelector)

const userInfo = new UserInfo(thisPageSettings);
const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "8e9e95f1-162a-4424-a2c2-34e39da75ee9",
    "Content-Type": "application/json"
  }
}

const api = new Api(apiOptions);
const cardAddFormValidator = new FormValidator(thisPageSettings, thisPageSettings.popupAddCardSelector);
cardAddFormValidator.enableValidation();
const profileFormValidator = new FormValidator(thisPageSettings, thisPageSettings.popupEditProfileSelector);
profileFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(thisPageSettings, thisPageSettings.popupEditAvatarSelector);
avatarFormValidator.enableValidation();

api.getData()
.then(([userData, cards]) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar
  });

  const cardsGallery = new Section(cards, (item) => {
    cardsGallery.addItem(createCard(item, userData._id))
  }, thisPageSettings.cardsGallerySelector);
  cardsGallery.renderItems(cards)

  const popupAdd = new PopupWithForm(thisPageSettings,
    thisPageSettings.popupAddCardSelector, (evt) => {
    evt.preventDefault();
    renderLoading(true, addCardSubmitButton);
    const inputValues = popupAdd.getInputValues();
    const card = {
      name: inputValues.title,
      link: inputValues.url,
      owner: {
        _id: userData._id
      },
      likes: []
    }

    api.addCard(card)
    .then((res) => {
      cardsGallery.addItem(createCard(res, userData._id))
    })
    .then(() => {
      popupAdd.close();
    })

    .catch((err) => {
      if(err) {
        console.log(err)
      }
    })

    .finally(() => {
      renderLoading(false, addCardSubmitButton, "Create");
    })
  });
  popupAdd.setEventListeners();

  buttonAddCard.addEventListener("click", () => {
    popupAdd.open();
    cardAddFormValidator.resetValidation();
  });
})

const popupWithImage = new PopupWithImage(thisPageSettings, thisPageSettings.popupImageSelector);
const popupAlert = new PopupWithForm(thisPageSettings, thisPageSettings.popupAlertSelector)

const createCard = (card, myId) => {
  const newCard = new Card(card, myId, thisPageSettings, () => {
    popupWithImage.cardObj = card;
    popupWithImage.open();
  }, () => {
    if (newCard.isOwner()) {
      popupAlert.handleSubmit = (evt) => {
        evt.preventDefault()
        api.deleteCard(newCard.getCardId())
        .then(() => {
          newCard.deleteCard()
        })
        .then(() => {
          popupAlert.close()
        })
        .catch(err => console.log(err))
      };
      popupAlert.open()
    }
  }, () => {
    if (!newCard.isLiked()) {
      api.addLike(newCard.getCardId())
      .then(value => {
        newCard.addLike();
        newCard.updateLikes(value);
      })
      .catch(err => console.log(err))
    } else {
      api.deleteLike(newCard.getCardId())
      .then(value => {
        newCard.removeLike();
        newCard.updateLikes(value)
      })
      .catch(err => console.log(err))
    }
  });
  return newCard.generateCard();
};

const popupEditProfile = new PopupWithForm(thisPageSettings,
thisPageSettings.popupEditProfileSelector,
(evt) => {
  evt.preventDefault();
  renderLoading(true, profileEditSubmitButton)
  const { name, about } = popupEditProfile.getInputValues();
  api.editProfile({ name: name, about: about })
  .then((userObj) => {
    userInfo.setUserInfo({
      name: userObj.name,
      about: userObj.about,
      avatar: userObj.avatar
     });
  })
  .then(() => popupEditProfile.close())

  .catch(err => console.log(err))

  .finally(() => renderLoading(false, profileEditSubmitButton, "Save"))
});
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
  const { name, about } = userInfo.getUserInfo()
  profileNameInput.value = name;
  profileJobInput.value = about;
  profileFormValidator.validateForm();
});

const popupEditAvatar = new PopupWithForm(thisPageSettings,
  thisPageSettings.popupEditAvatarSelector,
  (evt) => {
    evt.preventDefault();
    renderLoading(true, avatarEditSubmitButton)
    const url = popupEditAvatar.getInputValues();
    api.editAvatar(url.avatarUrl)
    .then(() => {
      profileImage.style.backgroundImage = `url(${url.avatarUrl})`
    })
    .then(() => {
      popupEditAvatar.close();
    })

    .catch(err => console.log(err))

    .finally(() => renderLoading(false, avatarEditSubmitButton, "Save"))
  });

buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  avatarFormValidator.resetValidation();
})

const renderLoading = (isLoading, button, value) => {
  if (isLoading) {
    button.textContent = "Saving"
  } else {
    button.textContent = value
  }
}
