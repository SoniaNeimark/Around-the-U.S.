// Profile section
//// Profile section Wrapper
const sectionProfile = document.querySelector(".profile")//Profile. <section> element
////// Profile section Elements
const userNameSet = document.querySelector(".profile__name");//User name <h1> Editable. Displays submitted data from profile-edit form.
const userJobSet = document.querySelector(".profile__profession");//User job <p>. Editable. Displays submitted data from profile-edit form.

// Elements section
//// Elements section Wrapper
const allCards = document.querySelector(".elements__cards");// Cards gallery, <ul> element to which default and new cards can be added.
////// Elements section Card Template
const cardTemplate = document.querySelector("#elements__card")// Card <template> for cards to be added

// Popup forms
//// Form wrappers
const popupEditProfile = document.querySelector(".popup-box_edit-profile");// <div> Profile-edit form popup-box wrapper
const popupAddCard = document.querySelector(".popup-box_add-card");// <div> Add-card form popup-box wrapper
const popupImage = document.querySelector(".popup-box_image");// <div> Image-preview popup-box wrapper
////// Forms
const formEditProfile = popupEditProfile.querySelector(".popup-box__content");//Profile-edit <form> element
const formAddCard = popupAddCard.querySelector(".popup-box__content");//Add-card <form> element
//////// Form Input fields
const userNameToSet = document.querySelector(".popup-box__item_type_name");// Name <input>
const userJobToSet = document.querySelector(".popup-box__item_type_job");// About me <input>
const cardTitleToSet = document.querySelector(".popup-box__item_type_title");// Title <input>
const cardLinkToSet = document.querySelector(".popup-box__item_type_link");// Image link <input>
//////// Form input buttons
const buttonEditProfile = sectionProfile.querySelector(".edit-button");// profile Edit <button>
const buttonAddCard = sectionProfile.querySelector(".add-button");// profile Add <button>

// Arrays && nodelists
//// Popups
const popupBoxes = document.querySelectorAll(".popup-box");// Popups
//// Input fields
const inputFields = document.querySelectorAll(".popup-box__item")// Popups' input fields
//// Buttons
const buttonsClose = document.querySelectorAll(".close-button");// Document's Close buttons
//// Other
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
//// Kind of self-invoked Functions
function addDefaultCards() {
  initialCards.forEach(function(card) {
    const newCard = createCard(card.name, card.link);// New card from template
    allCards.append(newCard);
  });
};
addDefaultCards();//Create 6 default cards from initialCards array and add them to Cards gallery

function setInputEditProfile() {
  userNameToSet.value = userNameSet.textContent;
  userJobToSet.value = userJobSet.textContent;
};
setInputEditProfile();// Assign default values to popup-edit-profile form input fields

function closePopupsOnClick() {
  buttonsClose.forEach(function(button) {
    button.addEventListener("click", function() {handleButtonClose(button)});
  });
};
closePopupsOnClick();// Listen to popup Close button handlers on-click for all popup Close buttons (close popup on-click)

function setSaveButtonsStatusOnInput() {
  inputFields.forEach(function (field) {
    const parent = field.closest(".popup-box__content");
    field.addEventListener("input", function() {checkInputsToSubmit(parent)});
  });
};
setSaveButtonsStatusOnInput();// Listen to check forms inputFields values handlers on-input to set forms Submit button status (set form Submit button status on-input)

function handlePopupAnimation() {
  popupBoxes.forEach(function(popupBox) {
    popupBox.addEventListener("animationend", function() {
      if (popupBox.classList.contains("fade-out")) {
      popupBox.classList.remove("popup-box_opened")}
    });
  });
};
handlePopupAnimation();

//// Reusable Functions
////// CreateCard function
function createCard(name, link) {
  const cardReady = cardTemplate.content.cloneNode(true);// New card from template
  const cardLink = link;// Img src info
  const cardName = name;// Card title info
  const cardTitle = cardReady.querySelector(".elements__title"); // Card title in the layout
  cardTitle.textContent = cardName;
  const cardImage = cardReady.querySelector(".elements__image"); // Card image in the layout.
  cardImage.setAttribute("style", `background-image: url("${cardLink}");`); // Place image to the card layout

  cardImage.addEventListener("click", function(evt) {
    const image = popupImage.querySelector(".popup-box__image");// Image-preview image
    const subtitle = popupImage.querySelector(".popup-box__subtitle");// Image-preview subtitle
    const subtitleInfo = evt.target.closest(".elements__card").querySelector(".elements__title").textContent;
    subtitle.textContent = subtitleInfo;
    image.setAttribute("src", `${cardLink}`);
    image.setAttribute("alt", `${subtitleInfo}`);
    togglePopup(popupImage);
  });// Handle clickable image. Open popup-box with its parent image when clicked.

  const buttonDelete = cardReady.querySelector(".delete-button");// Card delete-button
  buttonDelete.addEventListener("click", function () {handleButtonDelete(buttonDelete)});// Call Card delete-button handler on-click

  const buttonLike = cardReady.querySelector(".like-button");// Card like-button
  buttonLike.addEventListener("click", function () {toggleButtonLike(buttonLike)});// Call Card like-button handler on-click

  return cardReady;
};//Create new card from template ready to be added to Cards gallery when called

////// Other Reusable Functions
function togglePopup(popup) {
  if (!popup.classList.contains("popup-box_opened")) {
    popup.classList.remove("fade-out");
    popup.classList.add("fade-in", "popup-box_opened");
  } else {
    popup.classList.remove("fade-in");
    popup.classList.add("fade-out");
  };
};//Toggle smoothly popup display property when called (open or close popup)

function clearFields(form) {
  const fields = form.querySelectorAll(".popup-box__item");
  fields.forEach(function(field){
    field.value = "";
  });
};// Clear popup form input fields

function checkInputsToSubmit(form) {
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
};// Check popup form's input fields && set popup-form's Submit button status

function activateSaveButton(form) {
  const saveButton = form.querySelector(".save-button");// Form's Submit button
  saveButton.classList.add("save-button_status_active");
  saveButton.removeAttribute("disabled", true);
};// Activate popup-form's Submit button

function deactivateSaveButton(form) {
  const saveButton = form.querySelector(".save-button");// Form's Submit button
  saveButton.classList.remove("save-button_status_active");
  saveButton.setAttribute("disabled", true);
};// Deactivate popup-form's Submit button

//// Button and form handlers
////// Reusable button and form handlers
function handleButtonClose(button) {
  const parent = button.closest(".popup-box");
  togglePopup(parent);
};// Handle element Close button (close the button's grandParent or greatGrandParent Element)

function handleButtonDelete(button) {
  const parent = button.closest(".elements__card");
  parent.remove();
};//Handle delete-buttons (delete parentElement)

function toggleButtonLike(button) {
  if (!button.classList.contains("like-button_status_active")) {
    button.classList.add("like-button_status_active");
    button.classList.remove("hover-opacity", "hover-opacity_button_like");
  } else {
    button.classList.remove("like-button_status_active");
    button.classList.add("hover-opacity", "hover-opacity_button_like");
  }
};// Toggle like-buttons (like active/neutral)

////// Targeted button and form handlers
function handleButtonEditProfile() {
    togglePopup(popupEditProfile);
    checkInputsToSubmit(popupEditProfile);
}; // Handle Profile Edit button openning editProfile popup form

function handlButtonAddCard() {
  togglePopup(popupAddCard);
  clearFields(popupAddCard);
  deactivateSaveButton(popupAddCard);
}; // Handle Profile Add button openning addCard popup form

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userNameSet.textContent = userNameToSet.value;
  userJobSet.textContent = userJobToSet.value;
  checkInputsToSubmit(popupEditProfile);
  togglePopup(popupEditProfile);
};// Handle Submit form to edit profile

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleToSet.value // Title field input field value
  const link = cardLinkToSet.value // Image link input value
  const newcard = createCard(name, link);// New card from the input data
  allCards.prepend(newcard);
  togglePopup(popupAddCard);
}; //Handle Submit form to create a new card and add it to the gallery

//Event-listeners
formEditProfile.addEventListener("submit", handleProfileFormSubmit);// Listen editProfile popup-form submit handler (edit profile data)
formAddCard.addEventListener("submit", handleAddCardFormSubmit);// Listen addCard popup-form submit handler (add new card)
buttonEditProfile.addEventListener("click", handleButtonEditProfile);// Listen profile Edit button (open editProfile popup-form)
buttonAddCard.addEventListener("click", handlButtonAddCard);// Listen profile Add button (open addCard popup-form)

