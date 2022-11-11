const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let ImageForm = document.querySelector('.popup_type_image');
let nameInput = popupEdit.querySelector('.popup__item_el_name');
let jobInput = popupEdit.querySelector('.popup__item_el_about');
let nameInfo = document.querySelector('.profile__name');
let jobInfo = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button');
const closeImageButton = ImageForm.querySelector('.popup__close-button');
const saveEditButton = popupEdit.querySelector('.popup__save-button');
const saveAddButton = popupAdd.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.element');

const inputPlacename = popupAdd.querySelector('#place-name');
const inputPlaceLink = popupAdd.querySelector('#place-link');

const img = ImageForm.querySelector('.popup__image');
const cap = ImageForm.querySelector('.popup__caption');

//Открытие формы
const openPopupAdd = () => {
  popupAdd.classList.add('popup_opened');
  const formW = popupAdd.querySelector('.popup__content').clientWidth;
  const formH = popupAdd.querySelector('.popup__content').clientHeight;
  if (popupAdd.clientWidth >= 550) {
    closeAddButton.style.left = `${(popupAdd.clientWidth - formW) / 2 + formW + 8}px`;
    closeAddButton.style.top = `${((popupAdd.clientHeight - formH) / 2) - 40}px`;
  }
  else {
    closeAddButton.style.left = `${((popupAdd.clientWidth - formW) / 2) + formW - 20}px`;
    closeAddButton.style.top = `${((popupAdd.clientHeight - formH) / 2) - 36}px`;
  };
}

const openPopupEdit = () => {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  const formW = popupEdit.querySelector('.popup__content').clientWidth;
  const formH = popupEdit.querySelector('.popup__content').clientHeight;
  if (popupEdit.clientWidth >= 550) {
    closeEditButton.style.left = `${((popupEdit.clientWidth - formW) / 2) + formW + 8}px`;
    closeEditButton.style.top = `${((popupEdit.clientHeight - formH) / 2) - 40}px`;
  }
  else {
    closeEditButton.style.left = `${((popupEdit.clientWidth - formW) / 2) + formW - 20}px`;
    closeEditButton.style.top = `${((popupEdit.clientHeight - formH) / 2) - 36}px`;
  }
}
//Закрытие формы
const closePopup = (form) => {
  console.log(form);
  form.classList.remove('popup_opened');
}

//Функция сохранения данных и закрытия формы
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupEdit);
}

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
}

const handleLike = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__like_type_active');
}

const handleOpenImage = (evt) => {
  ImageForm.classList.add('popup_opened');
  img.src = evt.target.src;
  cap.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
if (ImageForm.clientWidth >= 550) {
  closeImageButton.style.left = `${((ImageForm.clientWidth - img.clientWidth) / 2) + img.clientWidth + 8}px`;
  closeImageButton.style.top = `${((ImageForm.clientHeight - img.clientHeight) / 2) - 48}px`;
}
else {
  closeImageButton.style.left = `${((ImageForm.clientWidth - img.clientWidth) / 2) + img.clientWidth - 20}px`;
  closeImageButton.style.top = `${((ImageForm.clientHeight - img.clientHeight) / 2) - 48}px`;
}
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
  cardImage.addEventListener('click', handleOpenImage);

  const cardLike = newCard.querySelector('.element__like');
  cardLike.addEventListener('click', handleLike);
  return newCard;

}
const formSubmitNewCard = (event) => {
  event.preventDefault();
  renderCard({ name: inputPlacename.value, link: inputPlaceLink.value });
  closePopup(popupAdd);
}

const renderCard = (dataCard) => {
  cards.prepend(createNewCard(dataCard));
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});


addButton.addEventListener('click', openPopupAdd);
editButton.addEventListener('click', openPopupEdit);

closeEditButton.addEventListener('click', () => closePopup(popupEdit));
closeAddButton.addEventListener('click', () => closePopup(popupAdd));
closeImageButton.addEventListener('click', () => closePopup(ImageForm));

popupEdit.addEventListener('submit', formSubmitHandler);
popupAdd.addEventListener('submit', formSubmitNewCard);
