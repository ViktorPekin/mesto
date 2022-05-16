export class UserInfo {
  constructor(profileName, profileSubName) {
    this._profileName = document.querySelector(profileName);
    this._profileSubName = document.querySelector(profileSubName);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      subName: this._profileSubName.textContent
    };
  }

  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileSubName.textContent = about;
  }
}
