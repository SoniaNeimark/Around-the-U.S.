export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    this._info = {};
    this._info.name = document.querySelector(this._nameSelector);
    this._info.job = document.querySelector(this._jobSelector);
    return this._info;
  }

  setUserInfo({ nameInfo, jobInfo }) {
    const {
      name,
      job
    } = this.getUserInfo();
    name.textContent = nameInfo;
    job.textContent = jobInfo;
  }

  setUserInputs(userNameToSetSelector, userJobToSetSelector) {
    const {
      name,
      job
    } = this.getUserInfo();

    document.querySelector(userNameToSetSelector).value = name.textContent;
    document.querySelector(userJobToSetSelector).value = job.textContent;
  }
}
