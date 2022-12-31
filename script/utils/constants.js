export const validationConfig = {
  popupSelector: '.popup__content',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');

export const formEdit = document.forms.editProfile;
export const formAdd = document.forms.addCard;

export const nameInput = popupEdit.querySelector('.popup__item_el_name');
export const jobInput = popupEdit.querySelector('.popup__item_el_about');
export const nameInfo = document.querySelector('.profile__name');
export const jobInfo = document.querySelector('.profile__about');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const closeEditButton = popupEdit.querySelector('.popup__close-button');
export const closeAddButton = popupAdd.querySelector('.popup__close-button');
export const closeImageButton = popupImage.querySelector('.popup__close-button');

export const saveEditButton = popupEdit.querySelector('.popup__save-button');
export const saveAddButton = popupAdd.querySelector('.popup__save-button');

export const cards = document.querySelector('.elements');

export const inputPlacename = popupAdd.querySelector('#place-name');
export const inputPlaceLink = popupAdd.querySelector('#place-link');
