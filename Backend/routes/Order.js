const express = require("express");
const orderRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const UserVerification = require("../models/UserVerification");

// Middleware for user verification (instead of 'protect')
const verifyUser = asyncHandler(async (req, res, next) => {
  const { uniqueString } = req.headers; // Assuming uniqueString is passed in headers

  if (!uniqueString) {
    res.status(400);
    throw new Error("No verification string provided.");
  }

  try {
    // Find the user verification record
    const userVerification = await UserVerification.findOne({ UniqueString: uniqueString });

    if (!userVerification) {
      res.status(404);
      throw new Error("User not verified.");
    }

    // Check if the verification has expired
    if (userVerification.expiredAt < new Date()) {
      res.status(401);
      throw new Error("Verification has expired.");
    }

    // Attach user info to request (can be used later in route handlers)
    req.user = {
      nameId: userVerification.nameId,
    };

    next();
  } catch (err) {
    res.status(500);
    throw new Error("Error verifying user: " + err.message);
  }
});

orderRoute.post(
  "/",
  verifyUser, // Use custom verifyUser middleware
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      shippingPrice,
      price, // price includes the tax
    } = req.body;

    console.log(orderItems);

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        shippingPrice,
        price, // price (including tax)
        user: req.user.nameId, // Use nameId from the verification
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

// Order detail (GET order by ID)
orderRoute.get(
  "/:id",
  verifyUser, // Use custom verifyUser middleware
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// Order list (GET all orders for the user)
orderRoute.get(
  "/",
  verifyUser, // Use custom verifyUser middleware
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.nameId }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Orders Not Found");
    }
  })
);

module.exports = orderRoute;
