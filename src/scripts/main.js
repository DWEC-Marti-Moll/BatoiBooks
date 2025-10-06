/* import "../styles/style.css";
import batoiLogo from "/logoBatoi.png";
//import * as functions from './functions.js';
import data from "../services/datos.js";
import Books from "../model/books.class.js";
import Users from "../model/users.class.js";
import Modules from "../model/modules.class.js";

const users = new Users();
const books = new Books();
const modules = new Modules();

users.populate(data.users);
books.populate(data.books);
modules.populate(data.modules);

document.querySelector("#app").innerHTML = `
  <div>
      <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
    <p class="texto">
      Abre la consola para ver el resultado
    </p>
  </div>
`;
try {
  console.log("Todos los libros del Módulo 5021:");
  const booksModule = books.booksFromModule('5021');
  booksModule.forEach((book) => console.log(book.toString()));

  console.log("Todos los libros con estado 'new':");
  const booksStatus = books.booksWithStatus('new');
  booksStatus.forEach((book) => console.log(book.toString()));

  console.log("Incrementar el precio de los libros un 10% y mostrarlos:");
  const incrementedBooks = books.incrementPriceOfbooks(0.1);
  incrementedBooks.forEach((book) => console.log(book.toString()));
} catch (error) {
  alert(error.message);
} */
import {getDBUsers} from "../services/users.api.js";

try {
  const users = await getDBUsers();
  console.log(users);
}catch(error){
  console.error("Error fetching users:", error);
}