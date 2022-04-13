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
const logo = document.getElementById("logo");
logo.src = logoSrc;
const profileImage = document.getElementById("profile");
const thisPageSettings = { ...documentSettings, ...pageSettings, ...validationSettings };
const buttonEditProfile = document.querySelector(thisPageSettings.buttonEditProfileSelector);
const buttonAddCard = document.querySelector(thisPageSettings.buttonAddCardSelector);
const buttonEditAvatar = document.querySelector(thisPageSettings.avatarEditButtonSelector)
const profileNameInput = document.querySelector(thisPageSettings.userNameToSetSelector);
const profileJobInput = document.querySelector(thisPageSettings.userJobToSetSelector);
const profileAvatarUrlInput = document.querySelector(thisPageSettings.userAvatarToSetSelector)
const profileEditSubmitButton = document.querySelector(thisPageSettings.profileEditSubmitButtonSelector)
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
.then((data) => {
  userInfo.setUserInfo({
    nameInfo: data[0].name,
    jobInfo: data[0].about
  });
  profileImage.style.backgroundImage = `url(${data[0].avatar})`;

  const cardsGallery = new Section(data[1], (item) => {
    cardsGallery.addItem(createCard(item, data[0]._id))
  }, thisPageSettings.cardsGallerySelector);
  cardsGallery.renderItems(data[1])

  const popupAdd = new PopupWithForm(thisPageSettings,
    thisPageSettings.popupAddCardSelector, (evt) => {
    evt.preventDefault();
    renderLoading(true, addCardSubmitButton);
    const inputValues = popupAdd.getInputValues();
    const cardObj = {
      name: inputValues.title,
      link: inputValues.url,
      owner: {
        _id: data[0]._id
      },
      likes: []
    }
    api.addCard(cardObj)
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })

    .catch((err) => {
      if(err) {console.log(err)}
    })

    .finally(() => {
      return api.getData()
      .then((data) => {
        cardsGallery.addItem(createCard(data[1][0], data[0]._id))
        popupAdd.close();
        renderLoading(false, addCardSubmitButton, "Create");
      })
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

const createCard = (cardObj, myId) => {
  const newCard = new Card(cardObj, myId, thisPageSettings, () => {
    popupWithImage.open(newCard._cardImage);
  }, () => {
    if (newCard._buttonDelete.classList.contains(thisPageSettings.buttonDeleteActiveClass)) {
      popupAlert._handleSubmit = (evt) => {
        evt.preventDefault()
        api.deleteCard(newCard._cardObj._id)
        newCard.deleteCard()
        popupAlert.close()
      };
      popupAlert.open()
    }
  }, () => {
    if (!newCard._buttonLike.classList.contains(thisPageSettings.buttonLikeActiveClass)) {
      api.addLike(newCard._cardObj._id)
      .then(res => res)
      .then(values => newCard._likesNumber.textContent = values.likes.length)
      newCard._buttonLike.classList.add(thisPageSettings.buttonLikeActiveClass)
    } else {
      api.deleteLike(newCard._cardObj._id)
      .then(res => res)
      .then(values => newCard._likesNumber.textContent = values.likes.length)
      newCard._buttonLike.classList.remove(thisPageSettings.buttonLikeActiveClass)
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
  .then((res) => {
    if(res.ok) {
      res.json()
    }
    return Promise.reject(res.statusText)
  })

  .catch((err) => {
    if (err) {
      console.log(err)
    }
  })

  .finally(() => {
    userInfo.setUserInfo({ nameInfo: name, jobInfo: about });
    renderLoading(false, profileEditSubmitButton, "Save");
    popupEditProfile.close();
  })
});
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
  const { name, job } = userInfo.getUserInfo()
  profileNameInput.value = name;
  profileJobInput.value = job;
  profileFormValidator.validateForm();
});

const popupEditAvatar = new PopupWithForm(thisPageSettings,
  thisPageSettings.popupEditAvatarSelector,
  (evt) => {
    evt.preventDefault();
    const url = popupEditAvatar.getInputValues();
    api.editAvatar(url.avatarUrl);
    profileImage.style.backgroundImage = `url(${url.avatarUrl})`
    popupEditAvatar.close();
  });

buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  profileAvatarUrlInput.value = profileImage.style.backgroundImage.slice(5, -2)
  avatarFormValidator.validateForm();
})

const renderLoading = (isLoading, button, value) => {
  if (isLoading) {
    button.textContent = "Saving"
  } else {
    button.textContent = value
  }
}
