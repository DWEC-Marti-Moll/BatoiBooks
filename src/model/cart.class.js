export default class Cart {
  constructor() {
    this.data = [];
  }

  populate() {}

  getBookById(id) {
    const book = this.data.find((item) => item.id === id);
    return book ? { ...book } : {};
  }

  addItem(book) {
    if (this.data.some((item) => item.id === book.id)) {
      throw new Error(`El libro con id ${book.id} ya está en el carrito`);
    }
    this.data.push({ ...book });
  }

  removeItem(id) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`El libro con id ${id} no se encuentra en el carrito`);
    }
    this.data.splice(index, 1);
  }

  toString() {
    if (this.data.length === 0) return "El carrito está vacío.";
    return this.data
      .map((book) => `${book.id}: ${book.title} (${book.moduleCode})`)
      .join("\n");
  }
}
