let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__item_el_name');
let jobInput = formElement.querySelector('.popup__item_el_about');
let nameInfo = document.querySelector('.profile__name');
let jobInfo = document.querySelector('.profile__about');
let cards = document.querySelectorAll('.element');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = formElement.querySelector('.popup__close-button');
const saveButton = formElement.querySelector('.popup__save-button');

//Открытие формы
function openPopup() {
    formElement.classList.add('popup_opened');
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
}

//Закрытие формы
function closePopup() {
    formElement.classList.remove('popup_opened');
}

//Поставить лайк
for (let i = 0; i <= cards.length - 1; i++) {
    let like = cards[i].querySelector('.element__like');
    like.addEventListener('click', () => {
        like.classList.add('element__like_type_active');
    });
}

//Функция сохранения данных и закрытия формы
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);