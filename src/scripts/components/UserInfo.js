export default class UserInfo {
  constructor(data) {
    this._data = data;
    this._name = document.querySelector(this._data.userNameSetSelector);
    this._job = document.querySelector(this._data.userJobSetSelector);
  }

  getUserInfo() {
    this._info = {};
    this._info.name = this._name.textContent;
    this._info.job = this._job.textContent;
    return this._info;
  }

  setUserInfo({ nameInfo, jobInfo }) {
    this._name.textContent = nameInfo;
    this._job.textContent = jobInfo;
  }
}
