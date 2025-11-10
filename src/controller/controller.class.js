import View from "../view/view.class";
import Books from "../model/books.class";
import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Cart from "../model/cart.class";

export default class Controller {
  constructor() {
    this.books = new Books();
    this.modules = new Modules();
    this.users = new Users();
    this.view = new View();
    this.cart = new Cart();
    this.currentEditId = null;
  }

  async init() {
    try {
      await Promise.all([
        this.books.populate(),
        this.modules.populate(),
        this.users.populate(),
        this.cart.populate(),
      ]);
      this.view.renderModulesInSelect(this.modules.data);
      this.view.renderBooks(this.books.data, this.modules.data);
      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
      this.view.setAddToCartHandler(this.handleAddToCart.bind(this));
      this.view.setEditBookHandler(this.handleEditBook.bind(this));
      this.view.setModuleChangeHandler(this.handleModuleChange.bind(this));
      this.view.setNewBookHandler(() => {
        this.currentEditId = null;
        this.view.resetForm();
      });
    } catch (err) {
      this.view.showMessage("error", `Error: ${err.message}`);
    }
  }

  async handleSubmitBook(submitBook) {
    try {
      if (!this.view.validateForm()) return;
      const datos = {
        ...submitBook,
        userId: 2,
        price: parseFloat(submitBook.price) || 0,
        pages: parseInt(submitBook.pages) || 0,
        soldDate: submitBook.solDate || "",
      };

      if (this.currentEditId) {
        datos.id = this.currentEditId;
        const updatedBook = await this.books.changeBook(datos);
        this.view.updateBook(updatedBook, this.modules.data);
        this.view.showMessage("info", "Libro modificado con éxito");
      } else {
        const newBook = await this.books.addBook(datos);
        const bookDiv = this.view.renderBook(newBook, this.modules.data);
        this.view.booksList.appendChild(bookDiv);
        this.view.showMessage("info", "Libro añadido con éxito");
      }

      this.currentEditId = null;
      this.view.resetForm();
    } catch (error) {
      this.view.showMessage("error", "Error al guardar el libro: " + error);
    }
    window.location.hash = "#list";
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

  handleAddToCart(bookId) {
    try {
      const book = this.books.getBookById(bookId);
      this.cart.addItem(book);
      this.view.showMessage("info", `Libro ${bookId} añadido al carrito`);
    } catch (err) {
      this.view.showMessage("error", err.message);
    }
  }
  handleEditBook(bookId) {
    const book = this.books.getBookById(bookId);
    this.currentEditId = bookId;
    this.view.formEdit(book);
  }

  async handleModuleChange(moduleCode) {
    const userId = 2;
    try {
      const exists = await this.books.bookExists(userId, moduleCode);
      if (exists) {
        this.view.setModuleCustomError("Ya tienes un libro de este módulo.");
      } else {
        this.view.setModuleCustomError("");
      }
      this.view.validateForm();
    } catch (err) {
      this.view.showMessage(
        "error",
        "Error al comprobar módulo: " + err.message
      );
    }
  }
}
