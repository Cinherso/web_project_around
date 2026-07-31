//1.SELECCIONAR ELEMENTOS DEL DOM

//Botones y popup
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

//Elementos del perfil de la página
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//2. ABRIR Y CERRAR EL POPUP
editButton.addEventListener("click", function () {
  //Rellenar los campos con los valores actuales de la página
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;

  popup.classList.add("popup_opened");
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

//3.MANEJAR EL FORMULARIO
//BUSQUEMOS EL FORMULARIO EN EL DOM
const formElement = document.querySelector(".popup__form");

//Busquemos los campos del formulario
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

function handleProfileFormSubmit(evt) {
  //previene que el navegador recargue la página
  evt.preventDefault();

  //Insertar nuevos valores a la página
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  //Cerrar el popup al guardar
  popup.classList.remove("popup_opened");
}

//conectar el handler al formulario
formElement.addEventListener("submit", handleProfileFormSubmit);

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

const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".cards");

function createCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__text").textContent = data.name;

  // abrir popup de imagen al hacer clic
  cardImage.addEventListener("click", function () {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    imagePopup.classList.add("popup_opened");
  });
  const likeButton = cardElement.querySelector(".card__button-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__button-like_active");
  });
  const deleteButton = cardElement.querySelector(".card__button-delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}
initialCards.forEach(function (data) {
  const card = createCard(data);
  cardsSection.append(card);
});
const addCardPopup = document.querySelector("#popup-add-card");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector('[name="add-card"]');
const closeAddCardButton = addCardPopup.querySelector(".popup__close");

addCardButton.addEventListener("click", function () {
  addCardPopup.classList.add("popup_opened");
});
closeAddCardButton.addEventListener("click", function () {
  addCardPopup.classList.remove("popup_opened");
});
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = document.querySelector("#title-input").value;
  const link = document.querySelector("#url-input").value;

  const newCard = createCard({ name, link });
  cardsSection.prepend(newCard);

  addCardPopup.classList.remove("popup_opened");
  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const imagePopup = document.querySelector("#popup-image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");

closeImageButton.addEventListener("click", function () {
  imagePopup.classList.remove("popup_opened");
});
