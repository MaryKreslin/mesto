const validationConfig = {
  popupSelector: '.popup__content',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

//Очистка от ошибок
const cleanErrors = (popupElement, validationConfig) => {
  const inputElements = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));
  inputElements.forEach((inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ''
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputElement.value = '';
  });
}

const showInputError = (popupElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (popupElement, inputElement, validationConfig) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (popupItem, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(popupItem, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(popupItem, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const setButtonActive = (buttonElement, validationConfig) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

const setButtonDisabled = (buttonElement, validationConfig) => {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    setButtonDisabled(buttonElement, validationConfig)
  }
  else {
    setButtonActive(buttonElement, validationConfig)
  }
}

const setEventListeners = (popupItem, validationConfig) => {
  const inputList = Array.from(popupItem.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupItem.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupItem, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const popupList = Array.from(document.querySelectorAll(validationConfig.popupSelector))
  popupList.forEach((popupElement) => {
    setEventListeners(popupElement, validationConfig)
  });
};

enableValidation(validationConfig);
