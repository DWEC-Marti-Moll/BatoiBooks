import "../styles/style.css";
import batoiLogo from "/logoBatoi.png";
import Controller from "../controller/controller.class";

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
    <div id="list"></div>

    <div id="remove">
      <label for="bookId">ID del libro:</label>
      <input type="text" id="bookId" placeholder="Introduce el ID" />
      <button id="removeBtn">Borrar libro</button>
    </div>

    <div id="form">
      <h2>Añadir libro</h2>
      <form id="bookForm">
        <div>
          <label for="title">Título:</label>
          <input type="text" id="title" name="title" required minlength="2" placeholder="Introduce el título del libro" />
        </div>

        <div>
          <label for="author">Autor:</label>
          <input type="text" id="author" name="author" required minlength="2" placeholder="Introduce el autor" />
        </div>

        <div>
          <label for="id-module">Módulo:</label>
          <select id="id-module" name="module" required>
          <option>- Selecciona un módulo -</option>
          </select>
        </div>

        <div>
          <span>Estado:</span><br />
          <label>
            <input type="radio" name="status" value="new" required/>
            Nuevo
          </label>
          <label>
            <input type="radio" name="status" value="good" />
            Bueno
          </label>
          <label>
            <input type="radio" name="status" value="bad" />
            Malo
          </label>
        </div>

        <div>
          <label for="year">Año de publicación:</label>
          <input type="number" id="year" name="year" required min="1900" max="2025" />
        </div>

        <div>
          <button type="submit">Guardar</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>

    <div id="about">
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
});
