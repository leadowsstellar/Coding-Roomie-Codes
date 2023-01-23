// write code here
const book = { title: 'T1' };
book.author = 'A1';
book['price'] = 1000;
delete book.price;
for (let key in book) {
    console.log(`${key}:${book[key]}`);
}
console.log(`book type check using proto: ${book.__proto__ === Object.prototype}`);