export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._haldleEscClose = this._haldleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _haldleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._haldleEscClose);
    this._popupSelector.addEventListener('click', this._handleOverlayClick);
    this._closeButton.addEventListener('click', this.close);;
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._haldleEscClose);
    this._popupSelector.removeEventListener('click', this._handleOverlayClick);
    this._closeButton.removeEventListener('click', this.close);
  }
}
