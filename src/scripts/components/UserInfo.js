export default class UserInfo {
  constructor(data) {
    this._data = data;
    this._name = document.querySelector(this._data.userNameSetSelector);
    this._about = document.querySelector(this._data.userJobSetSelector);
    this._avatar = document.querySelector(this._data.profileImageSelector)
  }

  getUserInfo() {
    this._info = {};
    this._info.name = this._name.textContent;
    this._info.about = this._about.textContent;
    return this._info;
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
