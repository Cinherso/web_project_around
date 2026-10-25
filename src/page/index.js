import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { initialCards, validationConfig } from "../constants/constants.js";

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
