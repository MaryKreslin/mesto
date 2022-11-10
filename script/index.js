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


let formElement = document.querySelectorAll('.popup');
let nameInput = formElement[0].querySelector('.popup__item_el_name');
let jobInput = formElement[0].querySelector('.popup__item_el_about');
let nameInfo = document.querySelector('.profile__name');
let jobInfo = document.querySelector('.profile__about');


const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = formElement[0].querySelector('.popup__close-button');
const closeAddButton = formElement[1].querySelector('.popup__close-button');
const saveEditButton = formElement[0].querySelector('.popup__save-button');
const saveAddButton = formElement[1].querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.element');

const inputPlacename = formElement[1].querySelector('#place-name');
const inputPlaceLink = formElement[1].querySelector('#place-link');



//Открытие формы
function openPopupAdd() {
  formElement[1].classList.add('popup_opened');
}

function openPopupEdit() {
  formElement[0].classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

//Закрытие формы
function closePopup(f) {
  formElement[f].classList.remove('popup_opened');
}

//Функция сохранения данных и закрытия формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(0);
}

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
}

const handleLike = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__like_type_active');
}

//Создание новой карточки
const createNewCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const trashButton = newCard.querySelector('.element__trash');
  trashButton.addEventListener('click', handleDeleteCard);

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = dataCard.link;

  const cardText = newCard.querySelector('.element__text');
  cardText.textContent = dataCard.name;

  const cardLike = newCard.querySelector('.element__like');
  cardLike.addEventListener('click', handleLike);
  return newCard;

}
const formSubmitNewCard = (event) => {
  event.preventDefault();
  renderCard({ name: inputPlacename.value, link: inputPlaceLink.value })
}

const renderCard = (dataCard) => {
  cards.prepend(createNewCard(dataCard));
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});


addButton.addEventListener('click', openPopupAdd);

editButton.addEventListener('click', openPopupEdit);
closeEditButton.addEventListener('click', () => closePopup(0));
closeAddButton.addEventListener('click', () => closePopup(1));

formElement[0].addEventListener('submit', formSubmitHandler);
formElement[1].addEventListener('submit', formSubmitNewCard);
