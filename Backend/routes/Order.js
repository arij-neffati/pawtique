const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const Order = require('../models/Order'); // Order model
const User = require('../models/User');   // User model
const router = express.Router();

if (!process.env.AUTH_MAIL || !process.env.AUTH_PASS) {
    console.error("Missing email credentials in environment variables!");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_MAIL,
        pass: process.env.AUTH_PASS,
    },
});

transporter.verify(function(error, success) {
    if (error) {
        console.error("Transporter verification failed:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Sending Order Confirmation Email
const sendOrderConfirmationEmail = async (orderData) => {
  try {
      const templatePath = path.join(__dirname, "../view/order-confirmation.html");

      if (!fs.existsSync(templatePath)) {
          console.error(`Template not found at: ${templatePath}`);
          throw new Error("Email template missing");
      }

      // Read the template content
      const template = fs.readFileSync(templatePath, 'utf-8');

      // Prepare the ordered items list
      const orderItems = orderData.orderItems.map(item => {
          return `<li><strong>${item.name}</strong> (${item.qty} x $${item.price}) - Subtotal: $${item.price * item.qty}</li>`;
      }).join('');  // Joining the items into a single string

      // Replace placeholders in the template
      const html = template
          .replace("{{name}}", orderData.email)  // Use the email as the name
          .replace("{{orderId}}", orderData._id)
          .replace("{{totalPrice}}", orderData.price)
          .replace("{{shippingAddress.address}}", orderData.shippingAddress.address)
          .replace("{{shippingAddress.city}}", orderData.shippingAddress.city)
          .replace("{{shippingAddress.postalCode}}", orderData.shippingAddress.postalCode)
          .replace("{{shippingAddress.country}}", orderData.shippingAddress.country)
          .replace("{{orderItems}}", orderItems);  // Inject the ordered items into the template

      // Send the email
      const mailOptions = {
          from: process.env.AUTH_MAIL,
          to: orderData.email,
          subject: "Order Confirmation",
          html: html,
      };

      console.log('Attempting to send email to:', orderData.email);
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result);
      return result;
  } catch (error) {
      console.error('Error in sendOrderConfirmationEmail:', error);
      throw error;
  }
};


// Route to submit the order

router.post("/", async (req, res) => {
  try {
      const { userId, orderItems, shippingAddress, price, shippingPrice } = req.body;

      if (!userId) {
          return res.status(400).json({
              error: "User ID is required!"
          });
      }

      // Fetch the user data using userId
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({
              error: "User not found!"
          });
      }

      // Create a new order associated with the user and include the email directly in the order
      const order = new Order({
          user: userId,
          email: user.email,  // Store the user's email directly in the order
          orderItems,
          shippingAddress,
          price,
          shippingPrice,
          isDelivered: false, // Initially set to false
      });

      const savedOrder = await order.save();

      // Send confirmation email after saving the order
      await sendOrderConfirmationEmail(savedOrder);

      res.status(200).json({
          message: "Order submitted and email sent successfully",
          order: savedOrder,
      });
  } catch (error) {
      console.error("Detailed error:", error);
      res.status(500).json({
          error: "Failed to submit order or send confirmation email",
          details: error.message,
      });
  }
});


// Route to get order details by ID
router.get("/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('user', 'email');

        if (!order) {
            return res.status(404).json({
                error: "Order not found!"
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({
            error: "Failed to fetch order details",
            details: error.message,
        });
    }
});

module.exports = router;
