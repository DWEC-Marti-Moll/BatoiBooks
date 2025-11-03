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
    try {
      await Promise.all([
        this.books.populate(),
        this.modules.populate(),
        this.users.populate(),
      ]);
      this.view.renderModulesInSelect(this.modules.data);
      this.view.renderBooks(this.books.data, this.modules.data);
      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
    } catch (err) {
      this.view.showMessage("error", `Error: ${err.message}`);
    }
  }

  async handleSubmitBook(submitBook) {
    try {
      const datos = {
        ...submitBook,
        price: parseFloat(submitBook.price) || 0,
        pages: parseInt(submitBook.pages) || 0,
        soldDate: submitBook.solDate || "",
      };
      const newBook = await this.books.addBook(datos);
      this.view.renderBook(newBook, this.modules);

      this.view.showMessage("info", "Libro añadido con éxito");
    } catch (error) {
      this.view.showMessage("error", "Error al añadir el libro: " + error);
    }
  }

  async handleRemoveBook(id) {
    try {
      await this.books.removeBook(id);
      this.view.removeBook(id);
      this.view.showMessage(
        "info",
        `Libro con ID ${id} eliminado correctamente.`
      );
    } catch (err) {
      this.view.showMessage("error", `Error al eliminar libro: ${err.message}`);
    }
  }
}
