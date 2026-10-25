import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";

const initialCards = [
  { name: "Alaska", link: "./images/card__image-alaska.jpg" },
  { name: "Grand Canyon", link: "./images/card__image-grand canyon.jpg" },
  { name: "Hawaii", link: "./images/card__image-hawaii.jpg" },
  { name: "New York", link: "./images/card__image-new york.jpg" },
  { name: "Portland", link: "./images/card__image-portland.jpg" },
  { name: "San Francisco", link: "./images/card__image-san francisco.jpg" },
];

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", handleCardClick);
      cardsList.addItem(card.generateCard());
    },
  },
  ".cards",
);

cardsList.renderItems();

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const formElement = document.querySelector(".popup__form");
const addCardForm = document.querySelector('[name="add-card"]');
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

//2. VALIDACIÓN DE FORMULARIOS
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

//3. POPUPS
const imagePopupInstance = new PopupWithImage("#popup-image");
imagePopupInstance.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.about });
  profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopupInstance = new PopupWithForm(
  "#popup-add-card",
  (formData) => {
    cardsList.addItem(createCard({ name: formData.title, link: formData.url }));
    addCardPopupInstance.close();
  },
);
addCardPopupInstance.setEventListeners();

//4. TARJETAS
function handleCardClick(name, link) {
  imagePopupInstance.open(name, link);
}

//initialCards.forEach(function (data) {
//  renderCard(data);
//});

//5. BOTONES QUE ABREN LOS POPUPS
editButton.addEventListener("click", function () {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = job;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", function () {
  addCardFormValidator.resetValidation();
  addCardPopupInstance.open();
});
