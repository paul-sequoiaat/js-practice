class Book {
    static name = "ABC";
    static author = "Bob";
    static price = 500;
    pages = 123;
    #signature = "secret";
    publisher;

    get sign() {
        return this.#signature;
    }

    set publish(publisher) {
        this.publisher = publisher;
    }

    static calculatePrice(quantity) {
        return quantity * this.price;
    }
}

const book = new Book();

console.log(book.name);                 //undefined
console.log(Book.author);               //Bob
console.log(book.pages);                //123

// console.log(book.#signature); this is not accessible outside the class as the '#' is a private identifier
console.log(book.sign);                 //secret

book.publish = "QWERTY";
console.log(book.publisher);            //QWERTY

console.log(Book.calculatePrice(10));   //5000