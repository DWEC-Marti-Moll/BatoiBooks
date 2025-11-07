import "../styles/style.css";
import batoiLogo from "/logoBatoi.png";
import Controller from "../controller/controller.class";
import Router from "../services/router";

document.querySelector("#app").innerHTML = `
  <header>
    <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>

  <div id="messages"></div>

  <div id="main">
    <div id="list" class="hidden"><div id="books-container"></div></div>

    <div id="form" class="hidden">
      <h2 id="form-title">Añadir libro</h2>
      <form id="bookForm" novalidate>
  <div id="book-id-container" style="display: none;">
    <label for="book-id">ID del libro:</label>
    <input type="text" id="book-id" name="book-id">
  </div>

  <div>
    <span class="error" id="error-module"></span>
    <label for="id-module">Módulo:</label>
    <select id="id-module" name="moduleCode" required>
      <option>- Selecciona un módulo -</option>
    </select>
  </div>

  <div>
    <span class="error" id="error-publisher"></span>
    <label for="publisher">Editorial:</label>
    <input type="text" id="publisher" name="publisher" required />
  </div>

  <div>
    <span class="error" id="error-price"></span>
    <label for="price">Precio:</label>
    <input type="number" id="price" name="price" required min="0" step="0.01">
  </div>

  <div>
    <span class="error" id="error-pages"></span>
    <label for="pages">Páginas:</label>
    <input type="number" id="pages" name="pages" required min="1">
  </div>

  <div>
    <span class="error" id="error-status"></span>
    <span>Estado:</span><br />
    <label>
      <input type="radio" name="status" id="new" value="new" required />
      Nuevo
    </label>
    <label>
      <input type="radio" name="status" id="good" value="good" />
      Bueno
    </label>
    <label>
      <input type="radio" name="status" id="bad" value="bad" />
      Malo
    </label>
  </div>

  <div>
    <span class="error" id="error-comment"></span>
    <label for="comment">Comentarios:</label>
    <textarea id="comment" name="comment" rows="4" cols="40"></textarea>
  </div>

  <div>
    <button type="submit">Guardar</button>
    <button type="reset">Reset</button>
  </div>
</form>

    </div>

    <div id="about" class="hidden">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</p>
    </div>
  </div>

  <footer>
    <p>Martí Moll Seguí ----- DWEC</p>
  </footer>
`;
document.addEventListener("DOMContentLoaded", () => {
  const myController = new Controller();
  myController.init();
  const router = new Router();
  router.init();
});
