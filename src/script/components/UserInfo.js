export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = nameSelector;
    this._job = infoSelector;
  }
  //возвращает объект с данными пользователя.
  getUserInfo() {
    const infoList = { userName: this._name.textContent, userJob: this._job.textContent }
    return infoList;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(info) {
    this._name.textContent = info.name;
    this._job.textContent = info.job;
  }
}
