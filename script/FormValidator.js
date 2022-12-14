export class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
        this._buttonElement = this._form.querySelector(validationConfig.submitButtonSelector);
        this._errorElement;
    }

    _showInputError(_inputElement, _errorMessage) {
        this._errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
        _inputElement.classList.add(this._validationConfig.inputErrorClass);
        this._errorElement.textContent = _errorMessage;
        this._errorElement.classList.add(this._validationConfig.errorClass);
    };

    _hideInputError(_inputElement) {
        this._errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
        _inputElement.classList.remove(this._validationConfig.inputErrorClass);
        this._errorElement.classList.remove(this._validationConfig.errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity(_inputElement) {
        if (!_inputElement.validity.valid) {
            this._showInputError(_inputElement, _inputElement.validationMessage);
        } else {
            this._hideInputError(_inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((_inputElement) => {
            return !_inputElement.validity.valid;
        })
    }

    _setButtonActive() {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled");
    }

    _setButtonDisabled() {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "");
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._setButtonDisabled()
        }
        else {
            this._setButtonActive()
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((_inputElement) => {
            _inputElement.addEventListener('input', () => {
                this._checkInputValidity(_inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._setEventListeners()

    };
}
