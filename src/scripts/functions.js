'use strict';
import data from '../services/datos.js';

function getBookById(books, number){
    const book = books.find(id => id.id === number);
    if(!book) throw new Error('Book not found');
    return book;
}
function getBookIndexById(books, number){
    const index = books.findIndex(id => id.id === number);
    if(index === -1) throw new Error('Book not found');
    return index;
}
function bookExists(books, userId, moduleCode){
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode);
}
function booksFromUser(books, userId){
    return books.filter(book => book.userId === userId);
}
function booksFromModule(books, moduleCode){
    return books.filter(book => book.moduleCode === moduleCode);
}
function booksCheeperThan(books, price){
    return books.filter(book => book.price < price);
}
function booksWithStatus(books, status){
    return books.filter(book => book.status === status);
}
function averagePriceOfBooks(books){
    if (books.length == 0) return '0.00 €';
    const total = books.reduce((sum, book) => sum + book.price, 0);
    const average = total / books.length;
    return average.toFixed(2) + ' €';
}
function booksOfTypeNotes(books){
    return books.filter(book => book.publisher === 'Apunts');
}
function booksNotSold(books){
    return books.filter(book => book.soldDate === '');
}
function incrementPriceOfbooks(books, percentage){
    return books.map(book => book.price * percentage/100);
}
function getUserById(users, userId){}
function getUserByNickName(users, nick){}
function getModuleByCode(modules, moduleCode){}

export{
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserByNickName,
    getModuleByCode
}