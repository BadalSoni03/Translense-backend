const mongoose = require('mongoose');

const ownerOtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    otpValidDurationInMinutes: {
        type: Number,
        default: 10
    },
    otpCreatedAt: {
        type: Date,
        default: new Date()
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Owner'
    }
}, { timestamps: true });

module.exports = mongoose.model('OwnerOTP', ownerOtpSchema);