export class UserInfo {
  constructor(profileName, profileSubName, profileAvatar, profile) {
    this._profileName = document.querySelector(profileName);
    this._profileSubName = document.querySelector(profileSubName);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._profile = profile;
  }

  renderInfo() {
    this._profileName.textContent = this._profile.name;
    this._profileSubName.textContent = this._profile.about;
    this._profileAvatar.src = this._profile.avatar;
  }

  removeAvatar(link) {
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
