// server.js
require('./config/db');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Incoming request headers:', req.headers);
    console.log('Session:', req.session);
    next();
});
const session = require("express-session");
// CORS configuration
const cors = require('cors');



app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // Change to `true` if using HTTPS
        sameSite: 'strict', // Options: 'strict', 'lax', or 'none' (if using cross-origin requests)
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
}));


app.use(cors({
    origin: 'http://localhost:4200',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

const UserRouter = require('./api/User');
const databaseSeeder = require('./DataSeeder');
const productRoute = require('./routes/Product');
const strayRouter = require('./api/strayRouter');
app.use('/report', strayRouter);
const adopt = require('./api/adopt');
app.use('/report', adopt);

console.log('Available routes:');
const orderRoute = require("./routes/Order");

// Enable CORS for all OPTIONS requests
app.options('*', cors());

// Session configuration




  

// Routes
app.use("/api/seed", databaseSeeder);
app.use('/user', UserRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// Add to your server.js or relevant user route:
app.post('/user/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
