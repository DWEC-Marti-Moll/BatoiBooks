import Book from "./book.class.js";
import * as api from "../services/books.api.js";
export default class Books {
  constructor() {
    this.data = [];
    this.idLibros = 0;
  }

  populate = async () => {
    const books = await api.getDBBooks();
    this.data = books.map((book) => new Book(book));
  };

  addBook = (book) => {
    const id = this.data.length
      ? Math.max(...this.data.map((b) => b.id)) + 1
      : 1;
    const newBook = new Book({ id, ...book });
    this.data.push(newBook);
    return newBook;
  };

  removeBook = async (bookId) => {
    const book = this.getBookById(bookId);
    await api.removeDBBook(bookId);
    this.data = this.data.filter((b) => b.id !== bookId);
    return book;
  };

  changeBook = async (book) => {
    const index = this.getBookIndexById(book.id);
    const updatedData = await api.changeDBBook(book);
    const updatedBook = new Book(updatedData);
    this.data[index] = updatedBook;
    return updatedBook;
  };

  getBookById = (bookId) => {
    const book = this.data.find((id) => id.id === bookId);
    if (!book) throw new Error("Book not found");
    return book;
  };
  getBookIndexById = (bookId) => {
    const index = this.data.findIndex((id) => id.id === bookId);
    if (index === -1) throw new Error("Book not found");
    return index;
  };

  bookExists = (userId, moduleCode) =>
    this.data.some(
      (book) => book.userId === userId && book.moduleCode === moduleCode
    );

  booksFromUser = (userId) =>
    this.data.filter((book) => book.userId === userId);

  booksFromModule = (moduleCode) =>
    this.data.filter((book) => book.moduleCode === moduleCode);

  booksCheeperThan = (price) => this.data.filter((book) => book.price < price);

  booksWithStatus = (status) =>
    this.data.filter((book) => book.status === status);

  averagePriceOfBooks() {
    if (this.data.length == 0) return "0.00 €";
    const total = this.data.reduce((sum, book) => sum + book.price, 0);
    const average = total / this.data.length;
    return average.toFixed(2) + " €";
  }
  booksOfTypeNotes() {
    const NOTE_TYPE = "Apunts";
    return this.data.filter((book) => book.publisher === NOTE_TYPE);
  }
  booksNotSold() {
    return this.data.filter((book) => !book.soldDate); // devuelve los libros que no tienen fecha de venta
  }
  toString() {
    return `Books: ${this.data.toString()}`;
  }
}
