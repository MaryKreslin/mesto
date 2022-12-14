export const cleanErrors = (popupElement, validationConfig) => {
  const inputElements = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));
  inputElements.forEach((inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ''
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputElement.value = '';
  });
}
export const setButtonActive = (buttonElement, validationConfig) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

export const setButtonDisabled = (buttonElement, validationConfig) => {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
}
