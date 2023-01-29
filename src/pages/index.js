import './index.css';
import Api from '../script/components/Api.js';
import { Card } from "../script/components/Card.js";
import { FormValidator } from "../script/components/FormValidator.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupConfirm from '../script/components/PopupConfirm.js';
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
  jobInfo,
  avatar,
  popupEditAvatar,
  popupConfirm,
  editAvatarButton
} from "../script/utils/constants.js";
import Section from "../script/components/Section.js";
import UserInfo from "../script/components/UserInfo.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'f63f7668-be7e-4344-8d52-d7bfb64972da',
    'Content-Type': 'application/json'
  }
});
const editProfileValidator = new FormValidator(validationConfig, popupEdit);
const addCardValidator = new FormValidator(validationConfig, popupAdd);
const editAvatarValidator = new FormValidator(validationConfig, popupEditAvatar);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();
const userInfoList = new UserInfo({ nameSelector: nameInfo, infoSelector: jobInfo, avatarSelector: avatar });

api.getUserInfo()
  .then((data) => {
    userInfoList.setUserInfo(data)
    const userdata = data;
    return userdata;
  })
  .then((userdata) => {
    api.getCardsInfo()
      .then((cardsData) => {
        const createCard = (cardData) => {
          const formConfirm = new PopupConfirm(popupConfirm, cardData, {
            handleFormSubmit: (item) => {
              api.deleteCard(item._id)
                .then(() => {
                  card.deleteCard(item);
                  formConfirm.close();
                })
                .catch((err) => { alert(err) })
            }
          });

          const card = new Card({
            cardData,
            userdata,
            handleCardClick: () => {
              formImage.open(card.cardText.textContent, card.cardImage);
            },

            handleAddLike: (cardId) => {
              api.putLike(cardId)
                .then((data) => {
                  card.toggleLike(data);
                })
                .catch((err) => { alert(err) })
            },
            handleDeleteLike: (cardId) => {
              api.deleteLike(cardId)
                .then((data) => {
                  card.toggleLike(data);
                })
                .catch((err) => { alert(err) })
            },
            handleCardDelete: (cardsData) => {
              formConfirm.open(cardsData._id);
            }
          },
            '#card');
          return card;
        }

        const cardListSection = new Section({
          items: cardsData,
          renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.generateCard();
            cardListSection.addItem(cardElement);
            card.handleShowTrash();
          }
        },
          '.elements');

        cardListSection.renderItems();

        const formAvatarEdit = new PopupWithForm(popupEditAvatar, {
          handleFormSubmit: (formValues) => {
            formAvatarEdit.renderLoading(true);
            api.pacthAvatarImg(formValues["avatar"])
              .then((data) => {
                userInfoList.setUserInfo(data)
                formAvatarEdit.close();
              })
              .finally(() => {
                formAvatarEdit.renderLoading(false);

              })
          }
        });

        const formEditProfile = new PopupWithForm(popupEdit, {
          handleFormSubmit: (formValues) => {
            formEditProfile.renderLoading(true);
            api.patchUserInfo(formValues["avatar-name"], formValues["avatar-about"])
              .then((data) => {
                userInfoList.setUserInfo(data);
                formEditProfile.close();
              })
              .finally(() => {
                formEditProfile.renderLoading(false);
              })
          }
        });

        const formAddCard = new PopupWithForm(popupAdd, {
          handleFormSubmit: (formValues) => {
            formAddCard.renderLoading(true);
            api.addNewCard(formValues["place-name"], formValues["place-link"])
              .then((cardData) => {
                const newCard = createCard(cardData);
                const cardElement = newCard.generateCard();
                cardListSection.addItem(cardElement);
                formAddCard.close();
              })
              .finally(() => {
                formAddCard.renderLoading(false);
              })
          }
        });

        const formImage = new PopupWithImage(popupImage);

        const handleOpenAdd = () => {
          formAddCard.open();
          addCardValidator.cleanErrors();
          addCardValidator.setButtonDisabled();
        };

        const handleOpenEdit = () => {
          editProfileValidator.cleanErrors();
          formEditProfile.open();
          const userInfo = userInfoList.getUserInfo();
          nameInput.value = userInfo.userName;
          jobInput.value = userInfo.userJob;
          editProfileValidator.setButtonActive();
        };

        const handleOpenAvatarEdit = () => {
          formAvatarEdit.open();
          editAvatarValidator.setButtonDisabled();
        }

        addButton.addEventListener('click', handleOpenAdd);
        editButton.addEventListener('click', handleOpenEdit);
        editAvatarButton.addEventListener('click', handleOpenAvatarEdit)
      })
      .catch((err) => { alert(err) })
  })
  .catch((err) => { alert(err) })
