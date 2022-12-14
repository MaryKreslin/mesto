import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { cleanErrors, setButtonActive, setButtonDisabled } from "./cleanErrors.js";

const validationConfig = {
  popupSelector: '.popup__content',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const formEdit = document.forms.editProfile;
const formAdd = document.forms.addCard;


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

const inputPlacename = popupAdd.querySelector('#place-name');
const inputPlaceLink = popupAdd.querySelector('#place-link');



const validation = (popupElement) => {
  const validator = new FormValidator(validationConfig, popupElement);
  validator.enableValidation();
}

//Открытие форм
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  validation(popup);
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


const handleNewCardSubmut = (evt) => {
  evt.preventDefault();
  const newCard = new Card({ name: inputPlacename.value, link: inputPlaceLink.value }, '#card')
  const cardElement = newCard.generateCard();
  cards.prepend(cardElement);
  closePopup(popupAdd);
}

initialCards.forEach((dataCard) => {
  const card = new Card(dataCard, '#card');
  const cardElement = card.generateCard();
  cards.append(cardElement);
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
