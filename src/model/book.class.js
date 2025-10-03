export default class Book {
    /* constructor(book){
        this.id = book.id;
        this.moduleCode = book.moduleCode;
        this.publisher = book.publisher;
        this.price = book.price;                Con este constructor dan errores los tests de Books
        this.pages = book.pages;
        this.status = book.status;
        this.photo = book.photo || '';
        this.comments = book.comments || '';
        this.soldDate = book.soldDate || '';
    } */
    constructor(book) {
        // valores por defecto
        this.photo = '';            //Con este constructor pasan los tests de Books
        this.comments = '';
        this.soldDate = '';
    
        // copiar todas las propiedades de book, sobrescribiendo los defaults si existen
        Object.assign(this, book);
    }

    toString(){
        return `ID: ${this.id}, ModuleCode: ${this.moduleCode}, 
        Publisher: ${this.publisher}, Price: ${this.price}, 
        Pages: ${this.pages}, Status: ${this.status}, 
        Photo: ${this.photo}, Comments: ${this.comments}, 
        SoldDate: ${this.soldDate}`;
    }
}