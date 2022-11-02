let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about');
let nameInfo = document.querySelector('.profile__name');
let jobInfo = document.querySelector('.profile__about');
let cards = document.querySelectorAll('.element');



const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');

function openPopup() {
    formElement.classList.add('popup_opened')
}

function closePopup() {
    formElement.classList.remove('popup_opened');
}

for (let i = 0; i <= cards.length - 1; i++) {
    let like = cards[i].querySelector('.element__like');
    like.addEventListener('click', () => {
        like.classList.add('element__like_type_active');
    });
}

//like.addEventListener('click', () => {
//  like.classList.add('element__like_type_active');
//});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    nameInfo.textContent = nameValue;
    jobInfo.textContent = jobValue;
    formElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', formSubmitHandler);