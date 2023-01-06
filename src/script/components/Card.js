export class Card {
  constructor({ data, handleCardClick }, cardSelector,) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._card;
    this._trashButton;
    this.cardText;
    this.cardImage;
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
    this.cardText = this._card.querySelector('.element__text');
    this.cardText.textContent = this._data.name;
    this.cardImage = this._card.querySelector('.element__image');
    this.cardImage.src = this._data.link;
    this.cardImage.alt = this._data.name;
    this._cardLike = this._card.querySelector('.element__like');
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => { this._handleDeleteCard(); });
    this.cardImage.addEventListener('click', () => { this.handleCardClick(); });
    this._cardLike.addEventListener('click', () => { this._handleLike(); });
  }

  _handleLike() {
    this._cardLike.classList.toggle('element__like_type_active');
  }

  _handleDeleteCard() {
    this._card.remove();
  }
}
