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

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
      callback(payload);
    });
  }

  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener("click", () => {
      // recoge la id del libro a borrar y la pasa a la fn
      callback(idToRemove);
    });
  }
}
