import User from "./user.class.js";
import * as api from "../services/users.api.js";
export default class Users {
  constructor() {
    this.data = [];
  }

  populate = async () => {
    const users = await api.getDBUsers();
    this.data = users.map((u) => new User(u.id, u.nick, u.email, u.password));
  };

  addUser = async (user) => {
    const newUserData = await api.addDBUser(user);
    const newUser = new User(
      newUserData.id,
      newUserData.nick,
      newUserData.email,
      newUserData.password
    );
    this.data.push(newUser);
    return newUser;
  };

  removeUser = async (id) => {
    const user = this.getUserById(id);
    await api.removeDBUser(id);
    this.data = this.data.filter((u) => u.id !== id);
    return user;
  };

  changeUser = async (user) => {
    const index = this.getUserIndexById(user.id);
    const updatedData = await api.changeDBUser(user);
    const updatedUser = new User(
      updatedData.id,
      updatedData.nick,
      updatedData.email,
      updatedData.password
    );
    this.data[index] = updatedUser;
    return updatedUser;
  };

  changeUserPassword = async (id, newPasswd) => {
    const index = this.getUserIndexById(id);

    const updatedData = await api.changeDBUserPassword(id, newPasswd);
    this.data[index].password = updatedData.password;
    return this.data[index];
  };

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
