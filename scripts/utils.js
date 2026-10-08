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

export function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClick);
}

export function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleOverlayClick);
}
