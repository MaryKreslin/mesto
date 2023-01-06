import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._form = this._popupSelector.querySelector('.popup__content');
    this._formValues;
    this._submitFormListener = this._submitFormListener.bind(this)
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

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitFormListener, { once: true });
  }

  _removeEventListeners() {
    super._removeEventListeners;
    this._popupSelector.removeEventListener('submit', this._submitFormListener, { once: true });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEventListeners();
    this._form.reset();
  }
}
