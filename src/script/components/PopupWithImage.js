import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = popupSelector.querySelector('.popup__image');
    this._captionPopup = popupSelector.querySelector('.popup__caption');
  }

  open(text, image) {
    super.open();
    this._imagePopup.src = image.src;
    this._captionPopup.textContent = text;
    this._imagePopup.alt = text;
    super._setEventListeners();
  }
}
