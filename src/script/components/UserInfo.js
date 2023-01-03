import { nameInfo, jobInfo } from "../utils/constants.js";
export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }
  //возвращает объект с данными пользователя.
  getUserInfo() {
    const name = nameInfo.textContent;
    const job = jobInfo.textContent;
    const infoList = { name, job };
    this._nameSelector.value = infoList.name;
    this._infoSelector.value = infoList.job;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(info) {
    nameInfo.textContent = info.name;
    jobInfo.textContent = info.job;
  }
}
