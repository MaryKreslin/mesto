import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._element;
    this._formValues;
  }
  //собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submitFormListener(evt) {
    evt.preventDefault();
    this._element = this._getInputValues();
    this._handleFormSubmit(this._formValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => this._submitFormListener(evt), { once: true });
  }

  close() {
    super.close();
    this._popupSelector.removeEventListener('submit', (evt) => this._submitFormListener(evt), { once: true });
    this._popupSelector.querySelector('.popup__content').reset();
  }
}
