'use strict';

/* const getBookById = (books, number) =>{
    const book = books.find(id => id.id === number);
    if(!book) throw new Error('Book not found');
    return book;
} */
/* const getBookIndexById = (books, number) =>{
    const index = books.findIndex(id => id.id === number);
    if(index === -1) throw new Error('Book not found');
    return index;
} */
/* const bookExists = (books, userId, moduleCode) => books.some(book => book.userId === userId && book.moduleCode === moduleCode); */
/* const booksFromUser = (books, userId) => books.filter(book => book.userId === userId); */
/* const booksFromModule = (books, moduleCode) => books.filter(book => book.moduleCode === moduleCode); */
/* const booksCheeperThan = (books, price) => books.filter(book => book.price < price); */
/* const booksWithStatus = (books, status) => books.filter(book => book.status === status); */
const averagePriceOfBooks = (books) =>{
    if (books.length == 0) return '0.00 €';
    const total = books.reduce((sum, book) => sum + book.price, 0);
    const average = total / books.length;
    return average.toFixed(2) + ' €';
}
const booksOfTypeNotes = (books) => books.filter(book => book.publisher === 'Apunts');
const booksNotSold = (books) => books.filter(book => book.soldDate === '');
const incrementPriceOfbooks = (books, percentage) =>{
    return books.map(book => ({
        ...book, 
        price: book.price + book.price * percentage}));
}
const getUserById = (users, userId) => {
    const user = users.find(id => id.id === userId);
    if(!user) throw new Error('User not found');
    return user;
}
const getUserIndexById = (users, userId) =>{
    const user = users.findIndex(id => id.id === userId);
    if(user == -1) throw new Error('User not found');
    return user;
}
const getUserByNickName = (users, nick) =>{
    const user = users.find(name => name.nick === nick);
    if(!user) throw new Error('User not found');
    return user;
}
const getModuleByCode = (modules, moduleCode) =>{
    const module = modules.find(mod => mod.code === moduleCode);
    if(!module) throw new Error('Module not found');
    return module;
}

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
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}