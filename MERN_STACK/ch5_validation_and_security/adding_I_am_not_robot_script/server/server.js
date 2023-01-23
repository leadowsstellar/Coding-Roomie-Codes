// write code here

const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');
const database = client.db('tempdb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const SECRET_KEY_FOR_JWT = 'jsonPass123'
const SECRET_KEY = "<YOUR_SECRET_KEY>";

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use(function (request, response, next) {
    setTimeout(() => { next() }, 2000);
});

const createJwt = (data) => {
    return jwt.sign(data, SECRET_KEY_FOR_JWT, { expiresIn: '24h' });
};

const verifyJwt = (token) => {
    return jwt.verify(token, SECRET_KEY_FOR_JWT, (error, decode) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
};

const verifyCaptchaAsync = async (token) => {
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET_KEY + "&response=" + token;
    return new Promise((resolve, reject) => {
        request(verificationUrl, (error, response, body) => {
            body = JSON.parse(body);
            if (body.success !== undefined && body.success) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

app.get('/get-books', async (request, response) => {
    const token = request.headers.authorization.split("Bearer")[1];
    if (verifyJwt(token)) {
        const collection = database.collection('books');
        const books = await collection.find().toArray();
        response.json(books);
    } else {
        response.json({ status: "FAILED", error: "Authentication error.Invalid jwt", message: "Authentication error." });
    }
});

app.get('/get-products', async (request, response) => {
    const collection = database.collection('products');
    const products = await collection.find();
    response.json(products);
});

app.post('/save-books', async (request, response) => {
    const token = request.headers.authorization.split("Bearer")[1];
    if (!verifyJwt(token)) {
        response.json({ status: "FAILED", error: "Authentication error.Invalid jwt", message: "Authentication error." });
        return;
    }
    const books = request.body;
    const collection = dataBase.collection("books");
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
        const updatedBooks = await collection.find().toArray();
        response.json(updatedBooks);
    }
});

app.post('/register', async (request, response) => {
    try {
        const { username, password, confirmPassword } = request.body;
        if (username.length < 3) {
            response.json({ status: "FAILED", error: "Validation error", message: "Username should have at least 3 characters." });
            return;
        }
        if (password !== confirmPassword) {
            response.json({ status: "FAILED", error: "Validation error", message: "Password and confirm password should be same." });
            return;
        }
        if (password.length < 6) {
            response.json({ status: "FAILED", error: "Validation error", message: "Password should have at least 6 characters." });
            return;
        }

        const isCaptchaVerified = await verifyCaptchaAsync(req.body.token);
        if (!isCaptchaVerified) {
            response.json({ status: "FAILED", error: "Validation error", message: "Recaptcha validation failed." });
            return;
        }

        const collection = dataBase.collection("users");
        const usernameExist = await collection.findOne({ username });
        if (usernameExist) {
            response.json({ status: "FAILED", error: "Registration error", message: "Username already exist." });
            return;
        }
        const hash = await bcrypt.hash(password, saltRounds);
        await collection.insertOne({ username, password: hash });
        response.json({ status: "SUCCESS", message: "Registered successful." });
    } catch (error) {
        response.json({ status: "FAILED", error: "Server error", message: "Internal server error." });
    }
});

app.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;
        if (username.length < 3) {
            response.json({ status: "FAILED", error: "Validation error", message: "Username should have at least 3 characters." });
            return;
        }
        if (password.length < 6) {
            response.json({ status: "FAILED", error: "Validation error", message: "Password should have at least 6 characters." });
            return;
        }
        const collection = dataBase.collection("users");
        const userData = await collection.findOne({ username });
        if (userData === null) {
            response.json({ status: "FAILED", error: "Login error", message: "User does not exist.Please register first." });
            return;
        }
        const hashFromDb = userData.password;
        const doesPasswordMatch = await bcrypt.compare(password, hashFromDb);
        if (!doesPasswordMatch) {
            response.json({ status: "FAILED", error: "Login error", message: "Invalid password." });
            return;
        }
        const dataToCreateJwt = {
            username,
            userId: userData._id
        };
        const jwtToken = createJwt(dataToCreateJwt);
        response.json({ status: "SUCCESS", message: "Login successful.", jwtToken });
    } catch (error) {
        response.json({ status: "FAILED", error: "Server error", message: "Internal server error." });
    }
});

app.listen(80, async () => {
    await client.connect();
    console.log('Listening on port 80');
});