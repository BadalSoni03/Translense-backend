const mongoose = require('mongoose');

const generate4DigitOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

const isValidMongoDbId = (id) => {
    return mongoose
        .Types
        .ObjectId
        .isValid(id);
}

module.exports = {
    generate4DigitOtp,
    isValidMongoDbId
}