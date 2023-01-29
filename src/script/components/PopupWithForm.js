import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._saveButton = this._popupSelector.querySelector('.popup__save-button');
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._form = this._popupSelector.querySelector('.popup__content');
    this._formValues;
    this._submitFormListener = this._submitFormListener.bind(this)
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'
    }
    else {
      this._saveButton.textContent = 'Сохранить'
    }
  }

  //собирает данные всех полей формы.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submitFormListener(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitFormListener, { once: true });
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupSelector.removeEventListener('submit', this._submitFormListener, { once: true });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
