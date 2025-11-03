export default class View {
  constructor() {
    this.booksList = document.getElementById("list");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.remove = document.getElementById("remove");
    this.removeBtn = document.getElementById("removeBtn");
    this.bookForm = document.getElementById("bookForm");
    this.messages = document.getElementById("messages");
  }

  renderModulesInSelect(modules) {
    const select = document.getElementById("id-module");
    select.innerHTML = "<option>- Selecciona un módulo -</option>";
    modules.forEach((module) => {
      const option = document.createElement("option");
      option.value = module.code;
      option.textContent = module.cliteral;
      select.appendChild(option);
    });
  }

  renderBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.className = "card";
    bookDiv.id = `book-${book.id}`;
    bookDiv.innerHTML = `
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${this.renderBookSaleDate(book.soldDate)}</p>
        <p>${book.comments}</p>
        <h4>${book.price} €</h4>
      </div>
    `;
    return bookDiv;
  }

  renderBookSaleDate(date) {
    if (!date) {
      return "En venta";
    }
    const soldLocalDate = new Date(date).toLocaleDateString("es-ES");
    return `Vendido el ${soldLocalDate}`;
  }
  renderBooks(books, modules) {
    this.booksList.innerHTML = "";
    books.forEach((book) => {
      const bookDiv = this.renderBook(book, modules);
      this.booksList.appendChild(bookDiv);
    });
  }

  removeBook(id) {
    const bookCards = this.booksList.getElementsByClassName("card");
    for (let card of bookCards) {
      if (card.querySelector("img").alt === `Libro: ${id}`) {
        this.booksList.removeChild(card);
        break;
      }
    }
  }

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.bookForm);
      const payload = Object.fromEntries(formData);
      callback(payload);
    });
  }

  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener("click", () => {
      const idToRemove = document.getElementById("bookId").value;
      callback(idToRemove);
    });
  }

  showMessage(type, message) {
    const newMessage = document.createElement("div");
    newMessage.className = `${type} alert alert-danger alert-dismissible`;
    newMessage.setAttribute("role", "alert");
    newMessage.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.append(newMessage);
    if (type !== "error") {
      setTimeout(() => {
        newMessage.remove();
      }, 3000);
    }
  }
}
