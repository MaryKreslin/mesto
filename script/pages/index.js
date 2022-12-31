import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards } from "../utils/dataCards.js";
import {
  validationConfig,
  popupEdit,
  popupAdd,
  popupImage,
  nameInput,
  jobInput,
  editButton,
  addButton,
  saveEditButton,
  saveAddButton,
} from "../utils/constants.js";
import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

const editProfileValidator = new FormValidator(validationConfig, popupEdit);
const addCardValidator = new FormValidator(validationConfig, popupAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const createCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      const formImage = new PopupWithImage(popupImage);
      formImage.open(card._cardText.textContent, card._cardImage);
    }
  },
    '#card');
  return card;
}

//создание карточек
const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement);
  }
},
  '.elements');

cardListSection.renderItems();

//открытие попапов
const handleOpenEdit = () => {
  editProfileValidator.cleanErrors();
  const formEditProfile = new PopupWithForm(popupEdit, {
    handleFormSubmit: (element) => {
      const { name, link: job } = element;
      const newInfo = { name, job };
      userInfoList.setUserInfo(newInfo)
      formEditProfile.close();
    }
  }
  );
  formEditProfile.open();
  formEditProfile.setEventListeners();
  const userInfoList = new UserInfo({ nameSelector: nameInput, infoSelector: jobInput });
  const userInfo = userInfoList.getUserInfo();
  editProfileValidator.setButtonActive(saveEditButton);

};

const handleOpenAdd = () => {
  const formAddCard = new PopupWithForm(popupAdd, {
    handleFormSubmit: (element) => {
      const newCard = createCard(element);
      const cardElement = newCard.generateCard();
      cardListSection.addItem(cardElement);
      formAddCard.close();
    }
  }
  );
  formAddCard.open();
  formAddCard.setEventListeners();
  addCardValidator.cleanErrors();
  addCardValidator.setButtonDisabled(saveAddButton);
};

editButton.addEventListener('click', handleOpenEdit);
addButton.addEventListener('click', handleOpenAdd);
