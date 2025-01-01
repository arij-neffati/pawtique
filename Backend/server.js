//server js
require('./config/db');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// At the top of your server.js or app.js
const cors = require('cors');

// Before your routes
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: false
}));
const UserRouter = require('./api/user');
const databaseSeeder = require('./DataSeeder');
const productRoute = require('./routes/Product');
const strayRouter = require('./api/strayRouter');
app.use('/report', strayRouter);
const adopt = require('./api/adopt');
app.use('/report', adopt);
console.log('Available routes:');
const orderRoute = require("./routes/Order");


app.options('*', cors()); 


app.use(express.json());


app.use("/api/seed", databaseSeeder);
app.use('/user', UserRouter);
app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




