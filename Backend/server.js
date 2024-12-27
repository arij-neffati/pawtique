require('./config/db');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const UserRouter = require('./api/user'); 
const databaseSeeder = require('./DataSeeder'); 
const productRoute = require('./routes/Product'); 
const strayRouter = require('./api/strayRouter'); 
const orderRoute = require("./routes/Order");

// Middleware
app.use(express.json());

// Routes
app.use("/api/seed", databaseSeeder);
app.use('/user', UserRouter);
app.use("/api/products", productRoute);
app.use('/stray', strayRouter);
app.use("/api/orders", orderRoute);

// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
