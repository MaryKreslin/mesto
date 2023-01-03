export class Card {
  constructor({ data, handleCardClick }, cardSelector,) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._card;
    this._trashButton;
    this._cardText;
    this._cardImage;
    this._cardLike;
    this.handleCardClick = handleCardClick;
    this._popupImage = document.querySelector('.popup_type_image');
    this._imagePopup = this._popupImage.querySelector('.popup__image');
    this._captionPopup = this._popupImage.querySelector('.popup__caption');
  }

  _getTemplate() {
    const newCard = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return newCard;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._trashButton = this._card.querySelector('.element__trash');
    this._cardText = this._card.querySelector('.element__text');
    this._cardText.textContent = this._data.name;
    this._cardImage = this._card.querySelector('.element__image');
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardLike = this._card.querySelector('.element__like');
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => { this._handleDeleteCard(); });
    this._cardImage.addEventListener('click', () => { this.handleCardClick(); });
    this._cardLike.addEventListener('click', () => { this._handleLike(); });
  }

  _handleLike() {
    this._cardLike.classList.toggle('element__like_type_active');
  }

  _handleDeleteCard() {
    this._card.remove();
  }

  _deleteCloseListeners() {
    this._popupImage.removeEventListener('click', this._handleOverlayClick);
    document.removeEventListener('keydown', this._haldleEscKey);
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      evt.target.classList.remove('popup_opened');
      this._deleteCloseListeners;
    }
  }

  _haldleEscKey(evt) {
    if (evt.key === 'Escape') {
      evt.target.querySelector('.popup_opened').classList.remove('popup_opened');
      this._deleteCloseListeners;
    }
  }

  _setCloseListeners() {
    this._popupImage.addEventListener('click', this._handleOverlayClick);
    document.addEventListener('keydown', this._haldleEscKey);
  }
}
