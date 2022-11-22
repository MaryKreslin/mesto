const showInputError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__item_el_error');
};

const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__item_el_error');
  errorElement.textContent = ' ';
};

const checkInputValidity = (popupItem, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popupItem, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupItem, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_disabled')
  }
  else { buttonElement.classList.remove('popup__save-button_disabled') }
}

const setEventListeners = (popupItem) => {
  const inputList = Array.from(popupItem.querySelectorAll('.popup__item'));
  const buttonElement = popupItem.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupItem, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};



const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup__content'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(popupElement.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach((fieldset) => { setEventListeners(fieldset) })
  });
};

enableValidation();
