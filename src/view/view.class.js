export default class View {
  constructor() {
    this.booksList = document.getElementById("list");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.remove = document.getElementById("remove");
    this.removeBtn = document.getElementById("removeBtn");
    this.bookForm = document.getElementById("bookForm");
    this.messages = document.getElementById("messages");

    // Datos pillats del formulari \\
    this.idModule = document.getElementById("id-module");
    this.publisher = document.getElementById("publisher");
    this.price = document.getElementById("price");
    this.pages = document.getElementById("pages");
    this.statusNew = document.getElementById("new");
    this.statusGood = document.getElementById("good");
    this.statusBad = document.getElementById("bad");
    this.comment = document.getElementById("comment");
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

  renderBooks(books, modules) {
    this.booksList.innerHTML = "";
    books.forEach((book) => {
      const module = modules.find((mod) => mod.code === book.moduleCode);
      const bookDiv = document.createElement("div");
      bookDiv.className = "card";
      bookDiv.innerHTML = `
        <img src="${book.photo}" alt="Libro: ${book.id}">
        <div>
          <h3>${module.cliteral} (${book.moduleCode})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} páginas</p>
          <p>Estado: ${book.status}</p>
          <p>${book.soldDate ? `Vendido el ${book.soldDate}` : "En venta"}</p> 
          <p>${book.comments}</p>
          <h4>${book.price} €</h4>
        </div>
      `;
      this.booksList.appendChild(bookDiv);
    });
  }

  removeBook(id) {}

  addBook(book) {}

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const module = this.idModule.value;
      const publisher = this.publisher.value;
      const price = parseFloat(this.price.value);
      const pages = parseInt(this.pages.value);
      let status = "";
      const comment = this.comment.value;
      if (this.statusBad.checked) {
        status = this.statusBad.value;
      } else if (this.statusGood.checked) {
        status = this.statusGood.value;
      } else {
        status = this.statusNew.value; // Ya que el status es required
      }

      const payload = [module, publisher, price, pages, status, comment];
      callback(payload);
    });
  }

  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener("click", () => {
      const idToRemove = document.getElementById("bookId").value;
      callback(idToRemove);
    });
  }

  showMessage(type, text) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `_tipo-recibido_ alert alert-dismissible`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
      ${text}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    if (type === "error") {
      alertDiv.classList.add("alert-danger");
    } else if (type === "success") {
      alertDiv.classList.add("alert-success");
    } else {
      alertDiv.classList.add("alert-info");
    }
    this.messages.appendChild(alertDiv);
  }
}
