const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Updated schema
const UserVerificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  // Reference to the User model
    },
    uniqueString: {
        type: String,
        required: true,  // Ensures the uniqueString is always present
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Defaults to the current date and time
    },
    expiresAt: {
        type: Date,
        required: true,  // Ensures that the expiration date is always present
    },
});

// Create and export the UserVerification model
const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = UserVerification;