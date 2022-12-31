import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._element;
  }
  //собирает данные всех полей формы.
  _getInputValues() {
    const name = this._popupSelector.querySelector('.popup__item_el_name').value;
    const link = this._popupSelector.querySelector('.popup__item_el_about').value;
    this._element = { name, link };
    return this._element;
  }

  _submitFormListener(evt) {
    evt.preventDefault();
    this._element = this._getInputValues();
    this._handleFormSubmit(this._element);
  }

  setEventListeners() {
    document.addEventListener('keydown', super._haldleEscClose);
    this._popupSelector.addEventListener('click', super._handleOverlayClick);
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('submit', (evt) => this._submitFormListener(evt), { once: true });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    super._removeEventListeners();
    //должен быть сброс формы
  }
}
