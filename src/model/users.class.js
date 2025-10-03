import User from "./user.class.js";
export default class Users {
  constructor() {
    this.data = [];
    this.idUsers = 0;
  }

  populate = (users) => {
    this.idUsers += users.length;
    this.data = users.map((user) => new User(user));
  };

  addUser() {}

  removeUser() {}

  changeUser() {}

  toString() {}

  getUserById = (userId) => {
    const user = this.data.find((id) => id.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  };
}
