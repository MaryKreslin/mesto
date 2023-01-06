import './index.css';

import { Card } from "../script/components/Card.js";
import { FormValidator } from "../script/components/FormValidator.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import { initialCards } from "../script/utils/dataCards.js";
import {
  validationConfig,
  popupEdit,
  popupAdd,
  popupImage,
  nameInput,
  jobInput,
  editButton,
  addButton,
  nameInfo,
  jobInfo
} from "../script/utils/constants.js";
import Section from "../script/components/Section.js";

import UserInfo from "../script/components/UserInfo.js";

const editProfileValidator = new FormValidator(validationConfig, popupEdit);
const addCardValidator = new FormValidator(validationConfig, popupAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const formImage = new PopupWithImage(popupImage);
const userInfoList = new UserInfo({ nameSelector: nameInfo, infoSelector: jobInfo });

const formEditProfile = new PopupWithForm(popupEdit, {
  handleFormSubmit: (formValues) => {
    const newInfo = { name: formValues["avatar-name"], job: formValues["avatar-about"] };
    userInfoList.setUserInfo(newInfo)
    formEditProfile.close();
  }
});

const formAddCard = new PopupWithForm(popupAdd, {
  handleFormSubmit: (formValues) => {
    const newCard = createCard({ name: formValues["place-name"], link: formValues["place-link"] });
    const cardElement = newCard.generateCard();
    cardListSection.addItem(cardElement);
    formAddCard.close();
  }
}
);

const createCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      formImage.open(card.cardText.textContent, card.cardImage);
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
  formEditProfile.open();
  formEditProfile.setEventListeners();
  const userInfo = userInfoList.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
  editProfileValidator.setButtonActive();
};

const handleOpenAdd = () => {
  formAddCard.open();
  formAddCard.setEventListeners();
  addCardValidator.cleanErrors();
  addCardValidator.setButtonDisabled();
};

editButton.addEventListener('click', handleOpenEdit);
addButton.addEventListener('click', handleOpenAdd);
