export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
    }

    _showInputError (popupElement, inputElement, errorMessage, validationConfig) {
        const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass);
    };

    _hideInputError (popupElement, inputElement, validationConfig) {
        const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity (popupItem, inputElement, validationConfig) {
        if (!inputElement.validity.valid) {
            this._showInputError(popupItem, inputElement, inputElement.validationMessage, validationConfig);
        } else {
            this._hideInputError(popupItem, inputElement, validationConfig);
        }
    };

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setButtonActive (buttonElement, validationConfig) {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }

    _setButtonDisabled (buttonElement, validationConfig) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
    }

    _toggleButtonState (inputList, buttonElement, validationConfig) {
        if (this._hasInvalidInput(inputList)) {
            this._setButtonDisabled(buttonElement, validationConfig)
        }
        else {
            this._setButtonActive(buttonElement, validationConfig)
        }
    }

    _setEventListeners (popupItem, validationConfig) {
        const inputList = Array.from(popupItem.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = popupItem.querySelector(validationConfig.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, validationConfig);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(popupItem, inputElement, validationConfig);
                this._toggleButtonState(inputList, buttonElement, validationConfig);
            });
        });
    };

    enableValidation () {
        this._setEventListeners(this._formElement, this._validationConfig)

    };
}
