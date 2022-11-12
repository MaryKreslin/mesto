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
const forms = document.querySelectorAll('.popup');
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

//положение кнопки X
const closeButtonPosition = (form, btn, formW, formH, dx, dy) => {
  const w = window.innerWidth - 17;
  const h = window.innerHeight;
  if (form.clientWidth >= 550) {
    btn.style.left = `${(w - formW) / 2 + formW + 8}px`;
    btn.style.top = `${((h - formH) / 2) - (40 + dx)}px`;
  }
  else {
    btn.style.left = `${((w - formW) / 2) + formW - 20}px`;
    btn.style.top = `${((h - formH) / 2) - (36 + dy)}px`;
  };
}

//Открытие форм
const openPopupAdd = () => {
  popupAdd.classList.add('popup_opened');
  const formW = popupAdd.querySelector('.popup__content').clientWidth;
  const formH = popupAdd.querySelector('.popup__content').clientHeight;
  closeButtonPosition(popupAdd, closeAddButton, formW, formH, 0, 0);
}

const openPopupEdit = () => {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  const formW = popupEdit.querySelector('.popup__content').clientWidth;
  const formH = popupEdit.querySelector('.popup__content').clientHeight;
  closeButtonPosition(popupEdit, closeEditButton, formW, formH, 0, 0);
}

//Закрытие формы
const closePopup = (form) => {
  form.classList.remove('popup_opened');
}

//Функция сохранения данных и закрытия формы
const formSubmitHandler = (evt) => {
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
  ImageForm.classList.add('popup_opened');
  img.src = evt.target.src;
  cap.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
  const imgW = img.clientWidth;
  const imgH = img.clientHeight;
  closeButtonPosition(ImageForm, closeImageButton, imgW, imgH, 8, 12);
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

const formSubmitNewCard = (evt) => {
  evt.preventDefault();
  renderCard({ name: inputPlacename.value, link: inputPlaceLink.value });
  closePopup(popupAdd);
}

const renderCard = (dataCard) => {
  cards.prepend(createNewCard(dataCard));
};

const resizeHandle = (evt) => {
  evt.preventDefault();
  forms.forEach((form, index) => {
    if (form.classList.contains('popup_opened')) {
      const f = form;
      const btn = f.querySelector('.popup__close-button');

      if ((index == 0) || (index == 1)) {
        let dx = 0;
        let dy = 0;
        let fw = f.querySelector('.popup__content').clientWidth;
        let fh = f.querySelector('.popup__content').clientHeight;
        closeButtonPosition(f, btn, fw, fh, dx, dy);
      };
      if (index == 2) {
        let dx = 8;
        let dy = 12;
        let fw = f.querySelector('.popup__content-image').clientWidth;
        let fh = f.querySelector('.popup__content-image').clientHeight;
        closeButtonPosition(f, btn, fw, fh, dx, dy);
      }
    }
  });
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

window.addEventListener('resize', resizeHandle);
