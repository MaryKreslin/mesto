export class Card {
  constructor(dataCard, cardSelector) {
    this._dataCard = dataCard;
    this._cardSelector = cardSelector;
    this._card;
    this._trashButton;
    this._cardText;
    this._cardImage;
    this._cardLike;
    this._ImagePopup;
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
    this._ImagePopup = document.querySelector('.popup_type_image');
    const img = this._ImagePopup.querySelector('.popup__image');
    const cap = this._ImagePopup.querySelector('.popup__caption');
    this._ImagePopup.classList.add('popup_opened');

    img.src = this._cardImage.src;
    cap.textContent = this._cardText.textContent;
    img.alt = this._cardText.textContent;

    this._setCloseListeners();
  }

  _setCloseListeners() {
    this._ImagePopup.addEventListener('click', (evt) => { this._handleOverlayClick(evt); });
    document.addEventListener('keydown', (evt) => { this._haldleEscKey(evt); });
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this._closePopup();
    }
  }

  _haldleEscKey(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }

  _closePopup() {
    this._ImagePopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._haldleEscKey);
    this._ImagePopup.removeEventListener('click', this._handleOverlayClick);
  }
}
