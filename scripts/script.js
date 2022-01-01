let editButton = document.querySelector(".edit-button");
let popupBox = document.querySelector(".popup-box");
let closeButton = document.querySelector(".close-button");
let nameInput = document.querySelector(".popup-box__item_type_name");
let jobInput = document.querySelector(".popup-box__item_type_profession");
let userName = document.querySelector(".profile__name");
let userProf = document.querySelector(".profile__profession");
let formElement = document.querySelector(".popup-box__content");
let saveButton = document.querySelector(".save-button");

function activateSaveButton() {
  saveButton.classList.add("save-button_status_active");
  saveButton.removeAttribute("disabled", true);
};

function deactivateSaveButton() {
  saveButton.classList.remove("save-button_status_active");
  saveButton.setAttribute("disabled", true);
};

function setSaveButtonStatus() {
  if (nameInput.value === "" || jobInput.value === "") {
    deactivateSaveButton();
  } else {
    activateSaveButton();
  }
};

function openPopup() {
  popupBox.classList.add("popup-box_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userProf.textContent;
  setSaveButtonStatus();
};

function closePopup() {
  popupBox.classList.remove("popup-box_opened");
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProf.textContent = jobInput.value;
  closePopup();
};

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

nameInput.addEventListener("input", setSaveButtonStatus);

jobInput.addEventListener("input",setSaveButtonStatus);

formElement.addEventListener("submit", handleProfileFormSubmit);

