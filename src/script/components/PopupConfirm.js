import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, carddata, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cardId;
    this._card = carddata;
    this._submitFormListener = this._submitFormListener.bind(this)
  }
  _submitFormListener(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._card);
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitFormListener, { once: true });
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupSelector.removeEventListener('submit', this._submitFormListener, { once: true });
  }
  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}
