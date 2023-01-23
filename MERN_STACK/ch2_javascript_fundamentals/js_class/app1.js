// write code here

class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    display() {
        console.log(`${this.title} ${this.author} ${this.price}`);
    }
}

const b1 = new Book('T1', 'A1', 1000);

console.log(`b1 refers to object that is created from Book class: ${b1.__proto__ === Book.prototype}`);

console.log(`Book class inherits object: ${Book.prototype.__proto__ === Object.prototype}`);

console.log(`title is part of the object: ${b1.title !== undefined}`);

b1.display();

console.log(`display belongs to prototype object of Book class: ${Book.prototype.display !== undefined}`);