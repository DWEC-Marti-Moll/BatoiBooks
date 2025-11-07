export default class View {
  constructor() {
    this.booksList = document.getElementById("books-container");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.removeBtn = document.getElementsByClassName("removeBtn");
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

  validateForm() {
    const form = document.getElementById("bookForm");

    // Limpia errores anteriores
    form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));

    const idModule = form["id-module"].value.trim();
    const publisher = form.publisher.value.trim();
    const price = form.price.value.trim();
    const pages = form.pages.value.trim();
    const status = form.querySelector('input[name="status"]:checked');

    let valid = true;

    if (!idModule || idModule === "- Selecciona un módulo -") {
      document.getElementById("error-module").textContent =
        "Selecciona un módulo.";
      valid = false;
    }

    if (!publisher) {
      document.getElementById("error-publisher").textContent =
        "La editorial es obligatoria.";
      valid = false;
    }

    if (price === "") {
      document.getElementById("error-price").textContent =
        "El precio es obligatorio.";
      valid = false;
    } else if (isNaN(price) || parseFloat(price) < 0) {
      document.getElementById("error-price").textContent =
        "Debe ser un número mayor o igual que 0.";
      valid = false;
    }

    if (pages === "") {
      document.getElementById("error-pages").textContent =
        "El número de páginas es obligatorio.";
      valid = false;
    } else if (!Number.isInteger(Number(pages)) || parseInt(pages) < 0) {
      document.getElementById("error-pages").textContent =
        "Debe ser un número entero mayor o igual que 0.";
      valid = false;
    }

    if (!status) {
      document.getElementById("error-status").textContent =
        "Selecciona un estado.";
      valid = false;
    }

    return valid;
  }
}
