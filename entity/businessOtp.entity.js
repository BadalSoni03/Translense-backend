const mongoose = require('mongoose');

const businessOtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    otpValidDurationInMinutes: {
        type: Number,
        default: 10
    },
    otpCreatedAt: {
        type: Date
    },
    business: {
        type: mongoose.Types.ObjectId,
        ref: 'Business'
    }
}, { timestamps: true });

module.exports = mongoose.model('BusinessOTP', businessOtpSchema);