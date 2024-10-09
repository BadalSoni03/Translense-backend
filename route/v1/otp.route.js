const otpController = require('../../controller/v1/otp.controller');
const otpRouter = require('express').Router();

otpRouter.post('/verify/owner', (req, res) => otpController.verifyOwnerOtp(req, res));
otpRouter.post('/verify/business', (req, res) => otpController.verifyBusinessOtp(req, res));

module.exports = otpRouter;