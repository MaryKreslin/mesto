export class Card {
  constructor({ carddata, userdata, handleCardClick, handleAddLike, handleDeleteLike, handleCardDelete }, cardSelector,) {
    this._carddata = carddata;
    this._user = userdata;
    this._cardSelector = cardSelector;
    this._card;
    this._trashButton;
    this.cardText;
    this.cardImage;
    this._cardLike;
    this.handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleCardDelete = handleCardDelete;
    this._popupImage = document.querySelector('.popup_type_image');
    this._imagePopup = this._popupImage.querySelector('.popup__image');
    this._captionPopup = this._popupImage.querySelector('.popup__caption');
  }

  _getTemplate() {
    const newCard = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return newCard;
  }

  handleShowTrash() {
    if (this._user._id !== this._carddata.owner._id) {
      this._trashButton.classList.add('element__trash_disabled')
    }
  }

  generateCard() {
    this._card = this._getTemplate();
    this._trashButton = this._card.querySelector('.element__trash');
    this.cardText = this._card.querySelector('.element__text');
    this.cardText.textContent = this._carddata.name;
    this.cardImage = this._card.querySelector('.element__image');
    this.cardImage.src = this._carddata.link;
    this.cardImage.alt = this._carddata.name;
    this._cardLike = this._card.querySelector('.element__like');
    this._countLike = this._card.querySelector('.element__count-like');
    this._countLike.textContent = this._carddata.likes.length;
    this._carddata.likes.forEach((item) => {
      if (item.name == this._user.name) { this._cardLike.classList.add('element__like_type_active') }
    });
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => { this._handleDeleteCard(); });
    this.cardImage.addEventListener('click', () => { this.handleCardClick(); });
    this._cardLike.addEventListener('click', () => { this._handleLikeClick(); });
  }

  toggleLike(data) {
    this._cardLike.classList.toggle('element__like_type_active');
    this._countLike.textContent = data.likes.length;
    window.location.reload();
  }

  _handleLikeClick() {
    if (this._carddata.likes.length == 0) {
      this._handleAddLike(this._carddata._id);
    } else {
      this._carddata.likes.forEach((item) => {
        if (item._id == this._user._id) {
          this._handleDeleteLike(this._carddata._id);
        }
        else {
          this._handleAddLike(this._carddata._id);
        };
      })
    }
  }

  deleteCard() {
    this._card.remove();
  }

  _handleDeleteCard() {
    this._handleCardDelete(this._carddata);
  }
}
