
// write code here
const express = require('express');
const app = express();

app.use(express.static('public'));

const books = [
    { name: "Book-1", author: "Author-1", price: 50 },
    { name: "Book-2", author: "Author-2", price: 100 },
    { name: "Book-3", author: "Author-3", price: 80 }
];

app.get('/get-books', (request, response) => {
    response.json(books);
});

const products = [
    { name: "Product-1", quantity: 10, price: 50 },
    { name: "Product-2", quantity: 20, price: 100 },
    { name: "Product-3", quantity: 30, price: 80 }
];

app.get('/get-products', (request, response) => {
    response.json(products);
});

app.listen(80, () => {
    console.log('Listening on port 80');
});