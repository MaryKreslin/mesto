
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const formEdit = document.forms.editProfile;
const formAdd = document.forms.addCard;
const formImage = document.forms.ImageCard;

const nameInput = popupEdit.querySelector('.popup__item_el_name');
const jobInput = popupEdit.querySelector('.popup__item_el_about');
const nameInfo = document.querySelector('.profile__name');
const jobInfo = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const closeEditButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button');
const closeImageButton = popupImage.querySelector('.popup__close-button');

const saveEditButton = popupEdit.querySelector('.popup__save-button');
const saveAddButton = popupAdd.querySelector('.popup__save-button');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.element');

const inputPlacename = popupAdd.querySelector('#place-name');
const inputPlaceLink = popupAdd.querySelector('#place-link');

const img = popupImage.querySelector('.popup__image');
const cap = popupImage.querySelector('.popup__caption');

//Открытие форм
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  handleClosePopup(popup);
}

//Закрытие форм
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', haldleEscKey);
  popup.removeEventListener('click', handleOverlayClick);
  cleanErrors(popup, validationConfig);
}

//Функция сохранения данных и закрытия формы
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Удаление карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
}

//Лайк
const handleLike = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__like_type_active');
}

//Открытие формы картинки
const handleOpenImage = (evt) => {
  openPopup(popupImage);
  img.src = evt.target.src;
  cap.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
  img.alt = cap.textContent;
}

//Создание новой карточки
const createNewCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const trashButton = newCard.querySelector('.element__trash');
  trashButton.addEventListener('click', handleDeleteCard);

  const cardText = newCard.querySelector('.element__text');
  cardText.textContent = dataCard.name;

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardImage.addEventListener('click', handleOpenImage);

  const cardLike = newCard.querySelector('.element__like');
  cardLike.addEventListener('click', handleLike);
  return newCard;
}

const handleNewCardSubmut = (evt) => {
  evt.preventDefault();
  renderCard({ name: inputPlacename.value, link: inputPlaceLink.value });
  closePopup(popupAdd);
}

const renderCard = (dataCard) => {
  cards.prepend(createNewCard(dataCard));
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

//Открытие попапов
const handleOpenEdit = () => {
  openPopup(popupEdit);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  setButtonActive(saveEditButton, validationConfig);
};

const handleOpenAdd = () => {
  openPopup(popupAdd);
  popupAdd.reset;
  setButtonDisabled(saveAddButton, validationConfig);
}

//закрытие нажатием на оверлей или Esc
const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    cleanErrors(evt.currentTarget, validationConfig);
    closePopup(evt.currentTarget);
  }
}

const haldleEscKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    cleanErrors(popup, validationConfig);
    closePopup(popup)
  }
}

const handleClosePopup = (popup) => {
  popup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', haldleEscKey);
}

addButton.addEventListener('click', handleOpenAdd);
editButton.addEventListener('click', handleOpenEdit);

closeEditButton.addEventListener('click', () => closePopup(popupEdit));
closeAddButton.addEventListener('click', () => closePopup(popupAdd));
closeImageButton.addEventListener('click', () => closePopup(popupImage));

formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleNewCardSubmut);
