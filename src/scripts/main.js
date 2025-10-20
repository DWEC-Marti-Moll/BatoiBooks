import "../styles/style.css";
import batoiLogo from "/logoBatoi.png";

import Books from "../model/books.class.js";
import Users from "../model/users.class.js";
import Modules from "../model/modules.class.js";

const users = new Users();
const books = new Books();
const modules = new Modules();

document.querySelector("#app").innerHTML = `
  <div>
      <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
    <p class="texto">
      Abre la consola para ver el resultado
    </p>
  </div>
`;
async function init() {
  try {
    await Promise.all([users.populate(), modules.populate(), books.populate()]);

    console.log("----- Todos los libros -----");
    console.log(books.toString());

    console.log("----- Todos los usuarios -----");
    console.log(users.toString());

    console.log("----- Todos los módulos -----");
    console.log(modules.toString());

    console.log("----- Libros del Módulo 5021 -----");
    const books5021 = books.booksFromModule("5021");
    console.log(books5021.toString());

    console.log("----- Libros nuevos -----");
    const newBooks = books.booksWithStatus("new");
    console.log(newBooks.toString());
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

init();
