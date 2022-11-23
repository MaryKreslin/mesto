const showInputError = (popupElement, inputElement, errorMessage, selectors) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (popupElement, inputElement, selectors) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = ' ';
};

const checkInputValidity = (popupItem, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(popupItem, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(popupItem, inputElement, selectors);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass)
  }
  else { buttonElement.classList.remove(selectors.inactiveButtonClass) }
}

const setEventListeners = (popupItem, selectors) => {
  const inputList = Array.from(popupItem.querySelectorAll(selectors.inputSelector));
  const buttonElement = popupItem.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupItem, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};



const enableValidation = (selectors) => {
  const popupList = Array.from(document.querySelectorAll(selectors.popupSelector))
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(popupElement.querySelectorAll(selectors.fieldsetSelector));
    fieldsetList.forEach((fieldset) => { setEventListeners(fieldset, selectors) })
  });
};

enableValidation(
  {
    popupSelector: '.popup__content',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: '.popup__save-button_disabled',
    inputErrorClass: '.popup__item_type_error',
    errorClass: '.popup__item_el_error'
  });
