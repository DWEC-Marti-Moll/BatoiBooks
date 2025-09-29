import Book from "./book.class.js";
export default class Books {
  constructor() {
    this.data = [];
    this.idLibros = 0;
  }

  populate(books) {
    this.idLibros += books.length;
    this.data = books.map((book) => new Book(book));
  }

  addBook(book) {
    this.idLibros++;
    const newBook = { ...book, id: this.idLibros };
    this.data.push(newBook);
    return newBook;
  }

  removeBook(bookId) {
    const index = this.data.findIndex((book) => book.id === bookId);
    if (index === -1) throw new Error("Book not found");
    this.data.splice(index, 1);
  }

  changeBook() {}

  toString() {}

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
    this.data.some(book => book.userId === userId && book.moduleCode === moduleCode);

  booksFromUser = (userId) => this.data.filter(book => book.userId === userId);

  booksFromModule = (moduleCode) => this.data.filter(book => book.moduleCode === moduleCode);

  booksCheeperThan = (price) => this.data.filter(book => book.price < price);

  booksWithStatus = (status) => this.data.filter(book => book.status === status);

  averagePriceOfBooks = (books) =>{ //arreglar
    if (books.length == 0) return '0.00 €';
    const total = books.reduce((sum, book) => sum + book.price, 0);
    const average = total / books.length;
    return average.toFixed(2) + ' €';
}
}
