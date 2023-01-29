export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = infoSelector;
    this._avatar = avatarSelector
  }
  //возвращает объект с данными пользователя.
  getUserInfo() {
    const infoList = { userName: this._name.textContent, userJob: this._job.textContent, avatar: this._avatar.src }
    return infoList;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(info) {
    this._name.textContent = info.name;
    this._job.textContent = info.about;
    this._avatar.src = info.avatar;
    this._avatar.alt = info.name;
  }
}
