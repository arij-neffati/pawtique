const router = require("express").Router();

const Product = require("./models/Product");
const products = require("./data/Product");
const AsynHandler = require("express-async-handler");



router.post(
  "/products",
  AsynHandler(async (req, res) => {
    await Product.deleteMany({});
    const ProductSeeder = await Product.insertMany(products);
    res.send({ ProductSeeder });
  })
);

module.exports = router;