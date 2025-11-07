export default class Router {
    constructor() {
      window.addEventListener("hashchange", () => this.onHashChange());
    }
  
    init() {
      // Al iniciar, ocultamos todo
      this.hideAllSections();
    }
  
    hideAllSections() {
      document.getElementById("list").classList.add("hidden");
      document.getElementById("form").classList.add("hidden");
      document.getElementById("about").classList.add("hidden");
    }
  
    onHashChange() {
      // Oculta todo
      this.hideAllSections();
  
      // Obtiene el hash actual (sin #)
      const section = window.location.hash.substring(1);
  
      // Si existe una sección con ese id, la muestra
      if (section) {
        const element = document.getElementById(section);
        if (element) element.classList.remove("hidden");
      }
    }
  }
  