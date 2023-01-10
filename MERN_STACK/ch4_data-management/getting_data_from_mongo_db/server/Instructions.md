# CodingRoomie
## Chapter 4 session 5: Getting data from MongoDb
### Please follow the below instructions before running your application.

Run **npm i** in the root directory of the client app and the server app to install all the dependencies.

Make sure you have MongoDb Compass installed and running on your computer.

If you don't have MongoSh and just have mongoDb Compass. Then open compass and connect to the localhost:27017. Then on the bottom
click on the _MONGOSH. Once opened you can type the following commands to insert the values before running the application.

show dbs;
use tempdb;
db.createCollection("books");
show collections;

db.books.insertOne({ name:"Book-1", author:"Author-1", price:50 });
db.books.insertOne({ name:"Book-2", author:"Author-2", price:100 });
db.books.insertOne({ name:"Book-2", author:"Author-2", price:80 });
db.books.find();

db.createCollection("products");

show collections;

db.products.insertOne({ name:"Product-1", quantity:10, price:50 });
db.products.insertOne({ name:"Product-2", quantity:20, price:100 });
db.products.insertOne({ name:"Product-2", quantity:30, price:80 });
db.products.find();


