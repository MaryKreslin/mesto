const configList = {
  popupSelector: '.popup__content',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

//Очистка от ошибок
const cleanError = (popupElement, configList) => {
  const inputElements = Array.from(popupElement.querySelectorAll(configList.inputSelector));
  inputElements.forEach((inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ''
    inputElement.classList.remove(configList.inputErrorClass);
    inputElement.value = '';
  });
}

const showInputError = (popupElement, inputElement, errorMessage, configList) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configList.errorClass);
};

const hideInputError = (popupElement, inputElement, configList) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configList.inputErrorClass);
  errorElement.classList.remove(configList.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (popupItem, inputElement, configList) => {
  if (!inputElement.validity.valid) {
    showInputError(popupItem, inputElement, inputElement.validationMessage, configList);
  } else {
    hideInputError(popupItem, inputElement, configList);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const setButtonActive = (buttonElement, configList) => {
  buttonElement.classList.remove(configList.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

const setButtonDisabled = (buttonElement, configList) => {
  buttonElement.classList.add(configList.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
}

const toggleButtonState = (inputList, buttonElement, configList) => {
  if (hasInvalidInput(inputList)) {
    setButtonDisabled(buttonElement, configList)
  }
  else {
    setButtonActive(buttonElement, configList)
  }
}

const setEventListeners = (popupItem, configList) => {
  const inputList = Array.from(popupItem.querySelectorAll(configList.inputSelector));
  const buttonElement = popupItem.querySelector(configList.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupItem, inputElement, configList);
      toggleButtonState(inputList, buttonElement, configList);
    });
  });
};

const enableValidation = (configList) => {
  const popupList = Array.from(document.querySelectorAll(configList.popupSelector))
  popupList.forEach((popupElement) => {
    setEventListeners(popupElement, configList)
  });
};

enableValidation(configList);
