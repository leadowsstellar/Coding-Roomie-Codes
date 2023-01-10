// write code here

const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');
const database = client.db('tempdb');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(function (request, response, next) {
    setTimeout(() => { next() }, 2000);
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

app.post('/save-books', async (request, response) => {
    const books = request.body;
    const collection = database.collection("books");
    for (let book of books) {
        switch (book.status) {
            case "new & updated":
                delete book.status;
                book._id = ObjectId(book._id);
                await collection.insertOne(book);
                break;
            case "from-server & updated":
                delete book.status;
                book._id = ObjectId(book._id);
                await collection.findOneAndReplace({ _id: book._id }, book);
                break;
            case "from-server & deleted":
                delete book.status;
                book._id = ObjectId(book._id);
                await collection.deleteOne({ _id: book._id });
                break;
        }
    }
    const updatedBooks = await collection.find().toArray();
    response.json(updatedBooks);
});

app.listen(80, async () => {
    await client.connect();
    console.log('Listening on port 80');
});