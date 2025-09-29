import '../styles/style.css';
import batoiLogo from '/logoBatoi.png';
import * as functions from './functions.js';
import data from '../services/datos.js';

document.querySelector('#app').innerHTML = `
  <div>
      <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
    <p class="texto">
      Abre la consola para ver el resultado
    </p>
  </div>
`
console.log("Todos los libros del usuario 4:");
console.log(functions.booksFromUser(data.books, 4));
console.log("Todos los libros del módulo 5021 que están en buen estado:");
console.log(functions.booksWithStatus(functions.booksFromModule(data.books, "5021"), "good"));
console.log("Incrementar un 10% el precio de los libros");
console.log(functions.incrementPriceOfbooks(data.books, 0.1));