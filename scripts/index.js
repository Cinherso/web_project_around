import { openModal, closeModal } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";

//1. SELECCIONAR ELEMENTOS DEL DOM

//Botones y popup de editar perfil
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

//Elementos del perfil de la página
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Campos del formulario de editar perfil
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

//Elementos del popup de agregar tarjeta
const addCardPopup = document.querySelector("#popup-add-card");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector('[name="add-card"]');
const closeAddCardButton = addCardPopup.querySelector(".popup__close");

//Elementos del popup de imagen
const imagePopup = document.querySelector("#popup-image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");

//Template y sección de cards

const cardsSection = document.querySelector(".cards");

//3. FUNCIONES DE TARJETAS
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  cardsSection.prepend(card.generateCard());
}

//4. TARJETAS INICIALES
const initialCards = [
  {
    name: "Alaska",
    link: "./images/card__image-alaska.jpg",
  },
  {
    name: "Grand Canyon",
    link: "./images/card__image-grand canyon.jpg",
  },
  {
    name: "Hawaii",
    link: "./images/card__image-hawaii.jpg",
  },
  {
    name: "New York",
    link: "./images/card__image-new york.jpg",
  },
  {
    name: "Portland",
    link: "./images/card__image-portland.jpg",
  },
  {
    name: "San Francisco",
    link: "./images/card__image-san francisco.jpg",
  },
];

initialCards.forEach(function (data) {
  renderCard(data);
});

//5. POPUP DE EDITAR PERFIL
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  openModal(popup);
});

closeButton.addEventListener("click", function () {
  closeModal(popup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closeModal(popup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const profileFormValidator = new FormValidator(validationConfig, formElement);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//6. POPUP DE AGREGAR TARJETA
addCardButton.addEventListener("click", function () {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openModal(addCardPopup);
});

closeAddCardButton.addEventListener("click", function () {
  closeModal(addCardPopup);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector("#title-input").value;
  const link = document.querySelector("#url-input").value;
  renderCard({ name, link });
  closeModal(addCardPopup);
  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//7. POPUP DE IMAGEN
closeImageButton.addEventListener("click", function () {
  closeModal(imagePopup);
});
