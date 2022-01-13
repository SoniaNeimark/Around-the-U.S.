//Wrappers for popups
const popupBoxEditProfile = document.querySelector(".popup-box_edit-profile");// Profile-edit form popup-box
const popupBoxAddCard = document.querySelector(".popup-box_add-card");// Add-card form popup-box

//formElements
const formElementEditProfile = popupBoxEditProfile.querySelector(".popup-box__content");
const formElementAddCard = popupBoxAddCard.querySelector(".popup-box__content");

//Main page default display
const userNameSet = document.querySelector(".profile__name");//User name. Editable. Displays submitted data from profile-edit form.
const userJobSet = document.querySelector(".profile__profession");//User job. Editable. Displays submitted data from profile-edit form.

//Form input fields
const userNameToSet = document.querySelector(".popup-box__item_type_name");// Name
const userJobToSet = document.querySelector(".popup-box__item_type_job");// About me
const cardNameToSet = document.querySelector(".popup-box__item_type_title");// Title
const cardLinkToSet = document.querySelector(".popup-box__item_type_link");// Image link

//Cards
const allCards = document.querySelector(".elements__cards");// Cards gallery, <ul> element to which default and new cards can be added.

//Arrays && nodelists
const buttonsOpen = document.querySelectorAll(".open-form");// Popup Open buttons
const buttonsClose = document.querySelectorAll(".close-button");// Document's Close buttons
const inputFields = document.querySelectorAll(".popup-box__item")// Popup input fields
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
];// Array of images for default cards

// Functions
////createCards
function createCard(name, link) {
  const cardTemplate = document.querySelector("#elements__card")// Card template
  const cardReady = cardTemplate.content.cloneNode(true);// New card from template
  const cardLink = link;// Img src info
  const cardName = name;// Card title info
  const cardTitle = cardReady.querySelector(".elements__title"); // Card title in the layout
  cardTitle.textContent = cardName;
  const cardImage = cardReady.querySelector(".elements__image"); // Card image in the layout.
  cardImage.setAttribute("style", `background-image: url("${cardLink}");`); // placing image to the card layout

  const popupBoxImage = document.querySelector(".popup-box_image");// Image-preview popup-box
  cardImage.addEventListener("click", function(evt) {
    const popupImage = popupBoxImage.querySelector(".popup-box__image");// Image-preview image
    const subtitle = popupBoxImage.querySelector(".popup-box__subtitle");// Image-preview subtitle
    const subtitleInfo = evt.target.parentElement.querySelector(".elements__title").textContent;
    subtitle.textContent = subtitleInfo;
    popupImage.setAttribute("src", `${cardLink}`);
    popupImage.setAttribute("alt", `${subtitleInfo}`);
    togglePopup(popupBoxImage);
  });// Handle clickable image. Open popup-box with its parent image when clicked.

  const buttonDelete = cardReady.querySelector(".delete-button"); // Card delete-button
  buttonDelete.addEventListener("click", function () {handleButtonDelete(buttonDelete)});

  const buttonLike = cardReady.querySelector(".like-button");  // Card like-button
  buttonLike.addEventListener("click", function () {handleButtonLike(buttonLike)});

  return cardReady;
};//Create new card from template ready to be added to Cards gallery called

function addDefaultCards() {
  initialCards.forEach(function(card) {
    const newCard = createCard(card.name, card.link);// New card from template
    allCards.append(newCard);
  });
};
addDefaultCards();//Create 6 default cards from initialCards array && add them to Cards gallery called

////Button and form handlers
function handleButtonOpen(button) {
  if (button.classList.contains("edit-button")) {
    togglePopup(popupBoxEditProfile);
    setFormsInputFields();
    checkInputFields(popupBoxEditProfile);
  } else {
    togglePopup(popupBoxAddCard);
    setFormsInputFields();
    checkInputFields(popupBoxAddCard);
  };
  //setFormsInputFields();
};// Handle open-button openning popup form

function handleButtonClose(button) {
  const parent = button.parentElement;
  const grandParent = parent.parentElement;
  const greatGrandParent = grandParent.parentElement;
  button.classList.contains("close-button_place_image") ? togglePopup(grandParent) : togglePopup(greatGrandParent.parentElement);
};// Handle popup Close button

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
  checkInputFields(popupBoxEditProfile);
  togglePopup(popupBoxEditProfile);
};// Handle submit form to edit profile

function handleElementAddCard(evt) {
  evt.preventDefault();
  const name = cardNameToSet.value // Title field input field value
  const link = cardLinkToSet.value // Image link input value
  const newcard = createCard(name, link);// New card from the input data
  allCards.prepend(newcard);
  togglePopup(popupBoxAddCard);
}; //Handle submit form to create a new card and add it to the gallery

function handleButtonDelete(button) {
  button.parentElement.remove();
};//Handle delete-buttons

function handleButtonLike(button) {
  if (!button.classList.contains("like-button_status_active")) {
    button.classList.add("like-button_status_active");
    button.classList.remove("hover-opacity", "hover-opacity_button_like");
  } else {
    button.classList.remove("like-button_status_active");
    button.classList.add("hover-opacity", "hover-opacity_button_like");
  }
};// Handle like-buttons

////Other functions
function togglePopup(popup) {
  if (!popup.classList.contains("popup-box_opened")) {
    popup.classList.remove("fade-out");
    popup.classList.add("fade-in", "popup-box_opened");
  } else {
    popup.classList.remove("fade-in");
    popup.classList.add("fade-out");
    popup.addEventListener("animationend", function() {
      if (popup.classList.contains("fade-out")) {
      popup.classList.remove("popup-box_opened")}
    });
  };
};//Toggle smoothly popup-box display property when called

function setFormsInputFields() {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
  cardNameToSet.value = "";
  cardLinkToSet.value = "";
};// Assign values to popup forms input fields

function checkInputFields(form) {
  activateSaveButton(form);
  const fields = form.querySelectorAll(".popup-box__item");
  function checkField() {
    fields.forEach(function(field) {
      if (field.value === "") {
        deactivateSaveButton(form);
      };
    });
  };
  checkField();
};

function activateSaveButton(form) {
  const saveButton = form.querySelector(".save-button");// Form Submit button
  saveButton.classList.add("save-button_status_active");
  saveButton.removeAttribute("disabled", true);
};// Activate Submit button
//activateSaveButton();

function deactivateSaveButton(form) {
  const saveButton = form.querySelector(".save-button");// Form Submit button
  saveButton.classList.remove("save-button_status_active");
  saveButton.setAttribute("disabled", true);
};// Deactivate Submit button

//Event-listeners
formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);// Call handle submit form to edit profile
formElementAddCard.addEventListener("submit", handleElementAddCard);// Call handle submit form to add a new card

function handleButtonsOpen() {
  buttonsOpen.forEach(function(button) {
    button.addEventListener("click", function() {handleButtonOpen(button)});
  });
};
handleButtonsOpen();// Call handle popup Open for all open-buttons openning popup forms

function handleButtonsClose() {
  buttonsClose.forEach(function(button) {
    button.addEventListener("click", function() {handleButtonClose(button)});
  });
};
handleButtonsClose();// Call handle popup Close button for all popup Close buttons

function handleInputFields() {
  inputFields.forEach(function (field) {
    field.addEventListener("input", function() {checkInputFields(field.parentElement)});
  });
};
handleInputFields();// Call check forms inputFields value



