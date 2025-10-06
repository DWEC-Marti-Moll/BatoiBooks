export default class User {
  constructor(id, nick, email, password) {
    this.id = id;
    this.nick = nick;
    this.email = email;
    this.password = password;
  }

  toString() {
    return `ID: ${this.id}, Nickname: ${this.nick}, 
        Email: ${this.email}, Contraseña: ${this.password}`;
  }
}
