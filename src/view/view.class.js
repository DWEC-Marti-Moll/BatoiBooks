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

  renderBook(book, modules) {
  
    const module = modules.find(
      (mod) => String(mod.code) === String(book.moduleCode)
    );
    const moduleName = module ? module.cliteral : "Módulo desconocido";

    const bookDiv = document.createElement("div");
    bookDiv.className = "card";
    bookDiv.innerHTML = `
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${moduleName} (${book.moduleCode})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate ? `Vendido el ${book.soldDate}` : "En venta"}</p> 
        <p>${book.comments}</p>
        <h4>${book.price} €</h4>
      </div>
    `;
    return bookDiv;
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
