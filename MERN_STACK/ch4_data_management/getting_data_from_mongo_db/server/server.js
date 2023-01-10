// write code here

const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');
const database = client.db('tempdb');
const cors = require('cors');
app.use(cors());

app.use(function (request, response, next) {
    setTimeout(() => { next(); }, 2000);
});

app.get('/get-books', async (request, response) => {
    const collection = database.collection('books');
    const books = await collection.find().toArray();
    response.json(books);
});

app.get('/get-products', async (request, response) => {
    const collection = database.collection('products');
    const products = await collection.find().toArray();
    response.json(products);
});

app.listen(80, async () => {
    await client.connect();
    console.log('Listening on port 80');
});