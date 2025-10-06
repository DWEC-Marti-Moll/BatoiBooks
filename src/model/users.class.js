import User from "./user.class.js";
export default class Users {
  constructor() {
    this.data = [];
  }

  populate = (users) => {
    this.data = users.map(
      (user) => new User(user.id, user.nick, user.email, user.password)
    );
  };

  addUser(user) {
    const id = this.data.length
      ? Math.max(...this.data.map((u) => u.id)) + 1
      : 1;
    const newUser = new User(id, user.nick, user.email, user.password);
    this.data.push(newUser);
    return newUser;
  }

  removeUser(id) {
    const index = this.getUserIndexById(id);
    return this.data.splice(index, 1);
  }

  changeUser(user) {
    const index = this.getUserIndexById(user.id);
    this.data[index] = new User(user.id, user.nick, user.email, user.password);
    return this.data[index];
  }

  getUserById = (userId) => {
    const user = this.data.find((id) => id.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  };

  getUserIndexById = (userId) => {
    const user = this.data.findIndex((id) => id.id === userId);
    if (user == -1) throw new Error("User not found");
    return user;
  };

  getUserByNickName = (nick) => {
    const user = this.data.find((name) => name.nick === nick);
    if (!user) throw new Error("User not found");
    return user;
  };

  toString() {
    return this.data.map((u) => u.toString()).join("\n");
  }
}
