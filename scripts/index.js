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
let formElement = document.querySelector(".popup__form");

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
