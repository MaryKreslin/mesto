import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cardId;
    this._card;
    this._cardData;
    this._submitFormListener = this._submitFormListener.bind(this)
  }
  _submitFormListener(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._cardData, this._card);
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitFormListener, { once: true });
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupSelector.removeEventListener('submit', this._submitFormListener, { once: true });
  }
  open(cardData, card) {
    this._cardData = cardData;
    this._card = card;
    super.open();
  }
}
