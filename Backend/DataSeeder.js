const router = require("express").Router();
const Product = require("./models/Product");
const products = require("./data/Product");
const AsynHandler = require("express-async-handler");

router.post(
  "/products",
  AsynHandler(async (req, res) => {
    console.log("Seeding products..."); // Debug log
    await Product.deleteMany({});
    console.log("Deleted existing products..."); // Debug log

    const ProductSeeder = await Product.insertMany(products);
    console.log("Inserted new products:", ProductSeeder); // Debug log
    res.send({ ProductSeeder });
  })
);

module.exports = router;
