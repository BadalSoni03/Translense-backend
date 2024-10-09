const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        trim: true,
        require: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    business: {
        type: mongoose.Types.ObjectId,
        ref: 'Business'
    },
    accountEnabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);