export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      evt.target.classList.remove('popup_opened');
    }
  }

  _haldleEscClose(evt) {
    if (evt.key === 'Escape') {
      evt.target.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._haldleEscClose);
    this._popupSelector.addEventListener('click', this._handleOverlayClick);
    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._haldleEscClose);
    this._popupSelector.removeEventListener('click', this._handleOverlayClick);
    this._closeButton.removeEventListener('click', this.close.bind(this));
  }
}
