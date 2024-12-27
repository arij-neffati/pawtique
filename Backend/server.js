
require('./config/db'); 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const products = require("./data/Product");
const UserRouter = require('./api/user');

const databaseSeeder = require("./DataSeeder");
const productRoute = require("./api/Product");

app.use(express.json());
app.use("/api/seed", databaseSeeder);
app.use('/user', UserRouter);

app.use("/api/products", productRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
