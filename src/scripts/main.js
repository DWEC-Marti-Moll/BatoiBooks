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
import { getDBBooks, getDBBook, addDBBook, removeDBBook, changeDBBook } from "../services/books.api.js";
import { getDBUsers, getDBUser, addDBUser, removeDBUser } from "../services/users.api.js";
import Book from "../model/book.class.js";
import User from "../model/user.class.js";

const si = [57, "5021", "McGraw-Hill", 75, 273, "new"];
const si2 = [5, "Jervasio", "jervasio@gmail.com", "password"];
const book = new Book(si);
const user = new User(si2);

try {
  console.log("Users: ");
  console.log(await getDBUsers());
  console.log("User 3: ");
  console.log(await getDBUser(3));
  console.log("Books: ");
  console.log(await getDBBooks());
  console.log("Book 10: ");
  console.log(await getDBBook(10));
  //console.log("Add book: ");
  //console.log(await addDBBook(book));
  //console.log("Add user: ");
  //console.log(await addDBUser(user));
  //console.log("Delete book: ");
  //console.log(await removeDBBook(9));
  //console.log("Delete user: ");
  //console.log(await removeDBUser(2));
  //console.log("Change book: ");
  //console.log(await changeDBBook(book));
  //console.log("Change user: ");
  //console.log(await changeDBUser(user));
} catch (error) {
  console.error("Error fetching users:", error);
}
