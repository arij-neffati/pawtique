const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    orderItems: [
        {
            name: String,
            qty: Number,
            price: Number,
            productId: String
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    price: Number,
    shippingPrice: Number,
    isDelivered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', orderSchema);
