export default class View {
  constructor() {
    this.booksList = document.getElementById("books-container");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.removeBtn = document.getElementsByClassName("removeBtn");
    this.bookForm = document.getElementById("bookForm");
    this.messages = document.getElementById("messages");
    this.initValidation();
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
    const module = modules.find((mod) => mod.code === book.moduleCode);
    const moduleName = module ? module.cliteral : "Módulo desconocido";
    const bookDiv = document.createElement("div");
    bookDiv.className = "card";
    bookDiv.id = `book-${book.id}`;
    bookDiv.innerHTML = `
    <img src="${book.photo}" alt="Libro: ${book.id}">
    <div>
      <h3>${moduleName} (${book.id})</h3>
      <h4>${book.publisher}</h4>
      <p>${book.pages} páginas</p>
      <p>Estado: ${book.status}</p>
      <p>${this.renderBookSaleDate(book.soldDate)}</p>
      <p>${book.comments}</p>
      <h4>${book.price} €</h4>
    </div>
    <div class="book-actions">
      <button class="add-to-cart">
        <span class="material-icons">add_shopping_cart</span>
      </button>
      <button class="edit-book">
        <span class="material-icons">edit</span>
      </button>
      <button  class="removeBtn">
        <span class="material-icons">delete</span>
      </button>
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
    this.booksList.addEventListener("click", (event) => {
      const deleteBtn = event.target.closest("button.removeBtn");
      if (!deleteBtn) return;

      const bookDiv = deleteBtn.closest(".card");
      const bookId = bookDiv.querySelector("img").alt.split(": ")[1];

      if (confirm(`¿Eliminar libro con ID ${bookId}?`)) {
        callback(bookId);
      }
    });
  }

  setAddToCartHandler(callback) {
    this.booksList.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const bookDiv = event.target.closest(".card");
        const bookId = bookDiv.querySelector("img").alt.split(": ")[1];
        callback(bookId);
      }
    });
  }

  setEditBookHandler(callback) {
    this.booksList.addEventListener("click", (event) => {
      const editBtn = event.target.closest("button.edit-book");
      if (!editBtn) return;

      const bookDiv = editBtn.closest(".card");
      const bookId = bookDiv.querySelector("img").alt.split(": ")[1];
      document
        .getElementById("book-id-container")
        .classList.remove("id-hidden");
      callback(bookId);
    });
  }

  formEdit(book) {
    window.location.hash = "#form";
    document.getElementById("form-title").textContent = "Editar libro";

    const idContainer = document.getElementById("book-id-container");
    const idInput = document.getElementById("book-id");
    idContainer.style.display = "block";
    idInput.value = book.id;
    idInput.disabled = true;

    document.getElementById("id-module").value = book.moduleCode || "";
    document.getElementById("publisher").value = book.publisher || "";
    document.getElementById("pages").value = book.pages || "";
    document.getElementById("price").value = book.price || "";
    document.getElementById("comment").value = book.comments || "";

    const statusRadio = document.querySelector(
      `input[name="status"][value="${book.status}"]`
    );
    if (statusRadio) statusRadio.checked = true;
  }

  updateBook(book, modules) {
    const bookDiv = document.getElementById(`book-${book.id}`);
    if (!bookDiv) return;
    bookDiv.innerHTML = this.renderBook(book, modules).innerHTML;
  }

  resetForm() {
    document.getElementById("form-title").textContent = "Añadir libro";
    const idInput = document.getElementById("book-id");
    document.getElementById("book-id-container").classList.add("id-hidden");
    idInput.disabled = false;
    idInput.value = "";
    this.bookForm.reset();
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

  setModuleChangeHandler(handler) {
    const select = document.getElementById("id-module");
    select.addEventListener("change", (e) => {
      const moduleCode = e.target.value;
      if (moduleCode && moduleCode !== "- Selecciona un módulo -") {
        handler(moduleCode);
      }
    });
  }

  setModuleCustomError(message) {
    const select = document.getElementById("id-module");
    const errorSpan = select.parentElement.querySelector(".error");

    select.setCustomValidity(message);
    if (message) {
      errorSpan.textContent = message;
      select.classList.add("error-border");
    } else {
      errorSpan.textContent = "";
      select.classList.remove("error-border");
    }
  }

  initValidation() {
    const form = this.bookForm;

    // Validar cada campo al escribir o cambiar
    form
      .querySelector("#id-module")
      .addEventListener("change", () => this.validateModule());
    form
      .querySelector("#publisher")
      .addEventListener("input", () => this.validatePublisher());
    form
      .querySelector("#price")
      .addEventListener("input", () => this.validatePrice());
    form
      .querySelector("#pages")
      .addEventListener("input", () => this.validatePages());
    form
      .querySelectorAll('input[name="status"]')
      .forEach((radio) =>
        radio.addEventListener("change", () => this.validateStatus())
      );
  }

  validateModule() {
    const idModule = this.bookForm.querySelector("#id-module");
    const errorSpan = document.getElementById("error-module");
    errorSpan.textContent = "";
    idModule.classList.remove("error-border");

    if (!idModule.value || idModule.value === "- Selecciona un módulo -") {
      errorSpan.textContent = "Selecciona un módulo.";
      idModule.classList.add("error-border");
      idModule.setCustomValidity("Selecciona un módulo.");
      return false;
    } else if (idModule.validationMessage) {
      errorSpan.textContent = idModule.validationMessage;
      idModule.classList.add("error-border");
      return false;
    }

    idModule.setCustomValidity("");
    return true;
  }

  validatePublisher() {
    const input = this.bookForm.querySelector("#publisher");
    const errorSpan = document.getElementById("error-publisher");
    errorSpan.textContent = "";
    input.classList.remove("error-border");

    if (!input.value.trim()) {
      errorSpan.textContent = "La editorial es obligatoria.";
      input.classList.add("error-border");
      return false;
    }
    return true;
  }

  validatePrice() {
    const input = this.bookForm.querySelector("#price");
    const errorSpan = document.getElementById("error-price");
    errorSpan.textContent = "";
    input.classList.remove("error-border");

    const value = input.value.trim();
    if (value === "") {
      errorSpan.textContent = "El precio es obligatorio.";
      input.classList.add("error-border");
      return false;
    } else if (isNaN(value) || parseFloat(value) < 0) {
      errorSpan.textContent = "Debe ser un número mayor o igual que 0.";
      input.classList.add("error-border");
      return false;
    }
    return true;
  }

  validatePages() {
    const input = this.bookForm.querySelector("#pages");
    const errorSpan = document.getElementById("error-pages");
    errorSpan.textContent = "";
    input.classList.remove("error-border");

    const value = input.value.trim();
    if (value === "") {
      errorSpan.textContent = "El número de páginas es obligatorio.";
      input.classList.add("error-border");
      return false;
    } else if (!Number.isInteger(Number(value)) || parseInt(value) < 0) {
      errorSpan.textContent = "Debe ser un número entero mayor o igual que 0.";
      input.classList.add("error-border");
      return false;
    }
    return true;
  }

  validateStatus() {
    const radios = this.bookForm.querySelectorAll('input[name="status"]');
    const errorSpan = document.getElementById("error-status");
    errorSpan.textContent = "";
    radios.forEach((r) => r.classList.remove("error-border"));

    const checked = this.bookForm.querySelector('input[name="status"]:checked');
    if (!checked) {
      errorSpan.textContent = "Selecciona un estado.";
      radios.forEach((r) => r.classList.add("error-border"));
      return false;
    }
    return true;
  }

  validateForm() {
    const v1 = this.validateModule();
    const v2 = this.validatePublisher();
    const v3 = this.validatePrice();
    const v4 = this.validatePages();
    const v5 = this.validateStatus();
    return v1 && v2 && v3 && v4 && v5;
  }
  setNewBookHandler(callback) {
    const newBookBtn = document.getElementById("add-new-book");
    if (newBookBtn) {
      newBookBtn.addEventListener("click", () => {
        callback();
      });
    }
  }
}
