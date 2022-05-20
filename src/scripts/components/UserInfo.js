export class UserInfo {
  constructor(profileName, profileSubName, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileSubName = document.querySelector(profileSubName);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  setAvatar(link) {
    this._profileAvatar.src = link;
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
