import View from "../view/view.class";
import Books from "../model/books.class";
import Modules from "../model/modules.class";
import Users from "../model/users.class";

export default class Controller {
  constructor() {
    this.books = new Books();
    this.modules = new Modules();
    this.users = new Users();
    this.view = new View();
  }

  async init() {
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
    try {
      await Promise.all([
        this.books.populate(),
        this.modules.populate(),
        this.users.populate(),
      ]);
      this.view.renderModulesInSelect(this.modules.data);
      this.view.renderBooks(this.books.data, this.modules.data);
      
    } catch (err) {
      this.view.showMessage("error", `Error: ${err.message}`);
    }
  }

  handleSubmitBook() {
    this.books.addBook(book);
    this.view.addBook(book);
    this.view.showMessage("info", "Libro añadido con éxito");
  }

  handleRemoveBook() {
    this.books.removeBook(id);
    this.view.removeBook(id);
    this.view.showMessage("info", `Libro con ID ${id} eliminado.`);
  }
}
