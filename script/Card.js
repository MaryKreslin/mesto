export class Card {
  constructor(dataCard, cardSelector) {
    this._dataCard = dataCard;
    this._cardSelector = cardSelector;
    this._card;
    this._trashButton;
    this._cardText;
    this._cardImage;
    this._cardLike;
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
    this._cardText.textContent = this._dataCard.name;
    this._cardImage = this._card.querySelector('.element__image');
    this._cardImage.src = this._dataCard.link;
    this._cardImage.alt = this._dataCard.name;
    this._cardLike = this._card.querySelector('.element__like');
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => { this._handleDeleteCard(); });
    this._cardImage.addEventListener('click', () => { this._handleOpenImage(); });
    this._cardLike.addEventListener('click', () => { this._handleLike(); });
  }

  _handleLike() {
    this._cardLike.classList.toggle('element__like_type_active');
  }

  _handleDeleteCard() {
    this._card.remove();
  }

  _handleOpenImage() {
    this._popupImage.classList.add('popup_opened');
    this._imagePopup.src = this._cardImage.src;
    this._captionPopup.textContent = this._cardText.textContent;
    this._imagePopup.alt = this._cardText.textContent;
    this._setCloseListeners();
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
