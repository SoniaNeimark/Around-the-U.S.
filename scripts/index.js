// DOCUMENT SETTINGS
//// SELECTORS
////// Elements Section
const cardSelector = ".elements__card";
const newCardImageSelector = ".elements__image";
const newCardTitleSelector = ".elements__title";
//////Popups
const popupSelector = ".popup-box";
const formFieldsetSelector = ".popup-box__fieldset";
const popupImageSelector = ".popup-box__image";
const popupSubtitleSelector = ".popup-box__subtitle";
const cardImageClass = "elements__image";


//// CSS CLASSES
const popupOpenclass = "popup-box_opened";
const buttonLikeClass = "like-button";
const buttonDeleteClass = "delete-button";

//// NODE ELEMENTS
////// Profile Section
const userNameSet = document.querySelector(".profile__name");
const userJobSet = document.querySelector(".profile__profession");
////// Elements Section
const newCardTemplate = document.querySelector("#elements__card");
const cardGallery = document.querySelector(".elements__cards");
////// Popups
//////// Popup wrappers
const popupEditProfile =  document.querySelector("#edit");
const popupAddCard = document.querySelector("#add");
const popupImage = document.querySelector("#image");
//////// Popup Forms
const formEditProfile = popupEditProfile.querySelector(".popup-box__form");
const formAddCard = popupAddCard.querySelector(".popup-box__form");
//////// Popups' inputs
const userNameToSet = popupEditProfile.querySelector(".popup-box__input_type_name");
const userJobToSet = popupEditProfile.querySelector(".popup-box__input_type_job");
const cardAlttoSet = popupAddCard.querySelector(".popup-box__input_type_title")
const cardSrctoSet = popupAddCard.querySelector(".popup-box__input_type_link")

//// ARRAYS AND OBJECTS
const popups = document.querySelectorAll(popupSelector);
const likeClasses = {
  buttonLikeActiveClass: "like-button_status_active",
  buttonLikeHoverClass: "hover-opacity",
  buttonLikeHoverSpecialClass: "hover-opacity_button_like"
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];/*Initial array of objects with image properties as their keys*/

const initialCardsKeys = Object.keys(initialCards[0]); /*Array of an initialCards object keys*/
const defaultCardsKeys = ["alt", "src"]; /*Array of keys for a defaultCards object*/

//FUNCTIONS
const createNewObj = (newKeys, newValues) => {
  const newObj = {}
  newKeys.forEach((newKey) => {
    const i = newKeys.indexOf(newKey);
    const newValue = newValues[i];
    newObj[`${newKey}`] = newValue;
  });
  return newObj;
};/*Create new Object from provided arrays of keys and values*/

const createObjectNewKeys = (props) => {
  const { sourceObj, newKeys, oldKeys } = props;
  const targetObj = {};
  newKeys.forEach(function (newKey) {
    const i = newKeys.indexOf(newKey);
    const oldKey = oldKeys[i];
    targetObj[`${newKey}`] = `${sourceObj[oldKey]}`;
  });
  return targetObj;
};/*Create new Object with same values, but renamed keys*/

const createArrayObjectsNewKeys = (props) => {
  const { sourceArr, newKeys, oldKeys } = props;
  const targetArr = sourceArr.map((el) => {
    const targetArrEl = createObjectNewKeys({
      sourceObj: el,
      newKeys: newKeys,
      oldKeys: oldKeys
    });
    return targetArrEl
  });
  return targetArr;
}/*Create new Array of Objects with same values, but renamed keys*/

const setMultipleElementAttributes = (el, attrs) => {
  for (let attr in attrs) {
    el.setAttribute(attr, attrs[attr]);
  };
};/*Set multiple attributes to an element*/

const createNewCard = (props) => {
  const { newCardImageSelector, newCardTitleSelector, newCardAttributes, title } = props || {};
  const newCard = newCardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector(newCardTitleSelector);
  const newCardImage = newCard.querySelector(newCardImageSelector);
  newCardTitle.textContent = `${title}`;
  setMultipleElementAttributes(newCardImage, newCardAttributes);
  return newCard;
}; /*Create a new card*/

const toggleClass = (el, classSelector) => {
  el.classList.toggle(classSelector);
};/*Toggle an element class*/

const toggleMultipleClasses = (el, classesObj) => {
  for (let classObj in classesObj) {
    el.classList.toggle(classesObj[`${classObj}`]);
  }
};/*Toggle multiple classes of an element*/

const deleteElement = (button, classSelector) => {
  const parent = button.closest(classSelector);
  parent.remove();
};/*Delete a button's corresponding element*/

const closeElement = (button, parentClassSelector, toggleClassSelector) => {
  const parent = button.closest(parentClassSelector);
  toggleClass(parent, toggleClassSelector);
}; /*Close a button's corresponding element*/

const removeClass = (el, classSelector) => {
  if (el.classList.contains(classSelector)) {
    toggleClass(el, classSelector);
  };
}; /*Removes the chosen class from the element classlist*/

const callRemoveClassForArrayEl = (elsArray, classSelector ) => {
  elsArray.forEach((el) => {
    removeClass(el, classSelector);
  });
}; /*Remove the chosen class from each array element classlist*/

const setUserDataSet = () => {
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
}/*Provide user info for Profile*/

const setProfileEditFields = () => {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};/*Set profileEdit inputs*/

const setAddCardFields = () => {
  cardAlttoSet.value = "";
  cardSrctoSet.value = "";
};/*Clear addCard inputs*/

const setPopupEditSubmit = () => {
  setUserDataSet();
  toggleClass(popupEditProfile, popupOpenclass);
};/*Update Profile user info from profileEdit inputs data */

const setAddCardSubmit = () => {
  const attrs = createNewObj(defaultCardsKeys, [cardAlttoSet.value, cardSrctoSet.value]);
  const newCard = createNewCard({
    newCardImageSelector: newCardImageSelector,
    newCardTitleSelector: newCardTitleSelector,
    newCardAttributes: attrs,
    title: `${attrs["alt"]}`
  });
  cardGallery.prepend(newCard);
  toggleClass(popupAddCard, popupOpenclass);
};/*Create new card from addCard inputs data*/

const addDefaultCards = () => {
  const defaultCards = createArrayObjectsNewKeys({
    sourceArr: initialCards,
    newKeys: defaultCardsKeys,
    oldKeys: initialCardsKeys
  });
  defaultCards.forEach(function (defaultCard) {
    const newCard = createNewCard({
      newCardImageSelector: newCardImageSelector,
      newCardTitleSelector: newCardTitleSelector,
      newCardAttributes: defaultCard,
      title: `${defaultCard["alt"]}`
    });
    cardGallery.append(newCard);
  });
};
addDefaultCards(); /*Create 6 default cards from the initialCards array and add them to the cardGallery*/

function openTargetImagePopup(targetImage) {
  const image = popupImage.querySelector(popupImageSelector);// Image-preview image
  const subtitle = popupImage.querySelector(popupSubtitleSelector);// Image-preview subtitle
  const subtitleInfo = targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent;
  subtitle.textContent = subtitleInfo;
  const popupImageAttributes = {
    src: targetImage.closest(cardSelector).querySelector(newCardImageSelector).src,
    alt: targetImage.closest(cardSelector).querySelector(newCardTitleSelector).textContent
  };
  setMultipleElementAttributes(image, popupImageAttributes);
  toggleClass(popupImage, popupOpenclass);
}/*Open popup with the corresponding image*/

// EVENT-LISTENERS
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains(buttonLikeClass)) {
    toggleMultipleClasses(evt.target, likeClasses);
  } else if (evt.target.classList.contains(buttonDeleteClass)) {
    deleteElement(evt.target, cardSelector);
  } else if (evt.target.classList.contains(cardImageClass)) {
    openTargetImagePopup(evt.target);
    document.addEventListener("keydown", (evt) => {
      if(evt.key == "Escape") {
        removeClass(popupImage, popupOpenclass);
      }
    });
  } else if (evt.target.classList.contains("close-button")
  && evt.target.closest(popupSelector).classList.contains("popup-box_image")) {
    document.removeEventListener("keydown", (evt) => {
      if(evt.key == "Escape") {
        removeClass(popupImage, popupOpenclass);
      }
    });
    toggleClass(evt.target.closest(popupSelector), popupOpenclass);
  } else if (evt.target.classList.contains("close-button")
  && !evt.target.closest(popupSelector).classList.contains("popup-box_image")) {
    evt.target.closest(popupSelector).querySelector(".popup-box__form").reset();
    toggleClass(evt.target.closest(popupSelector), popupOpenclass);
  } else if (evt.target.classList.contains("edit-button")) {
    setProfileEditFields();
    toggleClass(popupEditProfile, popupOpenclass);
  } else if (evt.target.classList.contains("add-button")) {
    setAddCardFields();
    toggleClass(popupAddCard, popupOpenclass);
  } else if (evt.target.classList.contains(popupOpenclass)) {
    toggleClass(evt.target, popupOpenclass);
  }
});/* Listen document on-click events*/


