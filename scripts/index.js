import { resetForm } from "./__modules/validation.js";

const setImageAttributes = (image, attrs) => {
  image.setAttribute("alt", attrs[0]);
  image.setAttribute("src", attrs[1])
};/*Set multiple attributes for the chosen img element*/

const openPopup = (popupWrapper) => {
  popupWrapper.classList.add(popupOpenclass);
}/*Open the chosen popup-box*/

const closePopup = (popupWrapper) => {
  popupWrapper.classList.remove(popupOpenclass);
}/*close the chosen popup-box*/

const toggleMultipleClasses = (el, classesObj) => {
  for (let classObj in classesObj) {
    el.classList.toggle(classesObj[`${classObj}`]);
  }
};/*Toggle multiple classes of the chosen element*/

const deleteElement = (button, parentClassSelector) => {
  const parent = button.closest(parentClassSelector);
  parent.remove();
};/*Delete a button's corresponding element*/

const createNewCard = (newCardAttributes) => {
  const newCard = newCardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector(newCardTitleSelector);
  const newCardImage = newCard.querySelector(newCardImageSelector);
  const cardDeletButton = newCard.querySelector(buttonDeleteSelector);
  const cardLikeButton = newCard.querySelector(buttonLikeSelector);

  newCardTitle.textContent = newCardAttributes[0];
  setImageAttributes(newCardImage, newCardAttributes);
  cardDeletButton.addEventListener("click", (evt) => {deleteElement(evt.target, cardSelector)});
  cardLikeButton.addEventListener("click", (evt) => {toggleMultipleClasses(evt.target, likeClasses);});
  newCardImage.addEventListener("click", (evt) => {openTargetImagePopup(evt.target)});

  cardGallery.prepend(newCard);
}; /*Create a new card && add it to cardGallery*/

const addDefaultCards = () => {
  const initialCardsReversed = initialCards.reverse();
  initialCardsReversed.forEach(function (card) {
    createNewCard([card[`name`], card[`link`]]);
  });
};
addDefaultCards(); /*Create 6 default cards from the initialCards array and add them to the cardGallery*/

const setUserDataSet = () => {
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
}/*Provide user info for Profile*/

const setProfileEditFields = () => {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};/*Set profileEdit inputs*/

const setPopupEditSubmit = () => {
  setUserDataSet();
  closePopup(popupEditProfile);
};/*Update Profile user info from profileEdit inputs data */

const setAddCardSubmit = () => {
  createNewCard([cardAlttoSet.value, cardSrctoSet.value]);
  closePopup(popupAddCard);
};/*Create new card from addCard inputs data*/

const openTargetImagePopup = (targetImage) => {
  const image = popupImage.querySelector(popupImageImageSelector);
  const subtitle = popupImage.querySelector(popupSubtitleSelector);
  const subtitleInfo = targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent;
  subtitle.textContent = subtitleInfo;
  const popupImageAttributes = [
    targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent,
    targetImage.closest(cardSelector).querySelector(newCardImageSelector).src
  ];
  setImageAttributes(image, popupImageAttributes);
  openPopup(popupImage);
  addEventListenerOnEsc(popupImage);
};/*Open popup with the corresponding image*/


const addEventListenerOnEsc = (popup) => {
  document.addEventListener("keydown", (evt) => {
    if (evt.key == "Escape") {
      closePopup(popup);
      removeEventListenerOnEsc(popup);
    };
  });
};/*Add event-listener on "esc" keydown*/

const removeEventListenerOnEsc = (popup) => {
  document.removeEventListener("keydown", (evt) => {
    if (evt.key == "Escape") {
      closePopup(popup);
    };
  });
};/*Remove event-listener on "esc" keydown*/

// Event-listeners
buttonEditProfile.addEventListener("click", () => {
  setProfileEditFields();
  openPopup(popupEditProfile);
  addEventListenerOnEsc(popupEditProfile);
  resetForm(popupEditProfile);
});/*Profile edit-button*/

buttonAddCard.addEventListener("click", () => {
  formAddCard.reset();
  openPopup(popupAddCard);
  resetForm(popupAddCard);
  addEventListenerOnEsc(popupAddCard);
});/*Profile add-button*/

const closePopupsOnButtonCloseClick = () => {
  popupsCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(popupSelector);
      closePopup(parent);
    });
  });
};
closePopupsOnButtonCloseClick(); /*Popups' close-buttons*/

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains(popupOpenclass)) {
    if (evt.target != popupImage) {
      resetForm(evt.target);
    };
    closePopup(evt.target);
  };
});/*Click outside forms*/

buttonSubmitEditProfile.addEventListener("click", () => {setPopupEditSubmit(), closePopup(popupEditProfile)});
/*Edtt-profile form submit button*/

buttonSubmitAddCard.addEventListener("click", () => {setAddCardSubmit(), closePopup(popupEditProfile)});
/*Add-card form submit button*/


