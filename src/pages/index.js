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
const userInfoList = new UserInfo({ nameSelector: nameInfo, infoSelector: jobInfo });
api.getUserInfo()
  .then((data) => {
    nameInfo.textContent = data.name;
    jobInfo.textContent = data.about;
    avatar.src = data.avatar;
    avatar.alt = data.name;
    const userdata = data;
    return userdata;
  })
  .then((userdata) => {
    api.getCardsInfo()
      .then((carddata) => {
        const createCard = (carddata) => {
          const card = new Card({
            carddata,
            userdata,
            handleCardClick: () => {
              formImage.open(card.cardText.textContent, card.cardImage);
            },
            handleAddLike: (cardId) => {
              api.putLike(cardId)
                .then((data) => {
                  card.toggleLike(data);
                })
            },
            handleDeleteLike: (cardId) => {
              api.deleteLike(cardId)
                .then((data) => {
                  card.toggleLike(data);
                })
            },
            handleCardDelete: (carddata) => {
              const formConfirm = new PopupConfirm(popupConfirm, carddata._id, {
                handleFormSubmit: (cardId) => {
                  api.deleteCard(cardId)
                    .then(() => {
                      card.deleteCard()
                    })
                  formConfirm.close();
                }
              });
              formConfirm.open();
              formConfirm.setEventListeners();
            }
          },
            '#card');
          return card;
        }

        const cardListSection = new Section({
          items: carddata,
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
            api.pacthAvatarImg(formValues["place-link"])
              .then((data) => {
                avatar.src = data.avatar
              })
              .finally(() => {
                formAvatarEdit.renderLoading(false);
                formAvatarEdit.close();
              })
          }
        });

        const formEditProfile = new PopupWithForm(popupEdit, {
          handleFormSubmit: (formValues) => {
            formEditProfile.renderLoading(true);
            api.patchUserInfo(formValues["avatar-name"], formValues["avatar-about"])
              .then((data) => {
                userInfoList.setUserInfo(data);
              })
              .finally(() => {
                formEditProfile.renderLoading(false);
                formEditProfile.close();
              })
          }
        });

        const formAddCard = new PopupWithForm(popupAdd, {
          handleFormSubmit: (formValues) => {
            formAddCard.renderLoading(true);
            api.addNewCard(formValues["place-name"], formValues["place-link"])
              .then((carddata) => {
                const newCard = createCard(carddata);
                const cardElement = newCard.generateCard();
                cardListSection.addItem(cardElement);
              })
              .finally(() => {
                formAddCard.renderLoading(false);
                formAddCard.close();
              })
          }
        });

        const formImage = new PopupWithImage(popupImage);

        const handleOpenAdd = () => {
          formAddCard.open();
          formAddCard.setEventListeners();
          addCardValidator.cleanErrors();
          addCardValidator.setButtonDisabled();
        };
        const handleOpenEdit = () => {
          editProfileValidator.cleanErrors();
          formEditProfile.open();
          formEditProfile.setEventListeners();
          const userInfo = userInfoList.getUserInfo();
          nameInput.value = userInfo.userName;
          jobInput.value = userInfo.userJob;
          editProfileValidator.setButtonActive();
        };

        const handleOpenAvatarEdit = () => {
          formAvatarEdit.open();
          formAvatarEdit.setEventListeners();
          editAvatarValidator.setButtonDisabled();
        }

        addButton.addEventListener('click', handleOpenAdd);
        editButton.addEventListener('click', handleOpenEdit);
        editAvatarButton.addEventListener('click', handleOpenAvatarEdit)
      })

  })
