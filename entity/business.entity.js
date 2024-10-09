const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        require: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Owner'
    },
    enabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);