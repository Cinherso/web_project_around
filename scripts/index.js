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
const cardTemplate = document.querySelector("#card-template").content;
const cardsSection = document.querySelector(".cards");

//2. FUNCIONES GENÉRICAS DE MODAL
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleOverlayClick);
}

//3. FUNCIONES DE TARJETAS
function createCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__text").textContent = data.name;

  cardImage.addEventListener("click", function () {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openModal(imagePopup);
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

function renderCard(data) {
  const card = createCard(data);
  cardsSection.prepend(card);
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

//6. POPUP DE AGREGAR TARJETA
addCardButton.addEventListener("click", function () {
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
