// write code here

const books = [
    { title: 'T1', author: 'A1', price: 1000 },
    { title: 'T2', author: 'A2', price: 2000 }
];

books.push({ title: 'T3', author: 'A3', price: 3000 });

books.splice(0, 1);

books.splice(1, 0, { title: 'T4', author: 'A4', price: 4000 });

for (let book of books) {
    console.log(`${book.title} ${book.author} ${book.price}`);
}

console.log(`books type check: ${books.__proto__ === Array.prototype}`);