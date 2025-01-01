//server js
require('./config/db');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRouter = require('./api/user');
const databaseSeeder = require('./DataSeeder');
const productRoute = require('./routes/Product');
const strayRouter = require('./api/strayRouter');
app.use('/report', strayRouter);
const adopt = require('./api/adopt');
app.use('/report', adopt);
console.log('Available routes:');
const orderRoute = require("./routes/Order");
const cors = require('cors');

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors()); 


app.use(express.json());


app.use("/api/seed", databaseSeeder);
app.use('/user', UserRouter);
app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




