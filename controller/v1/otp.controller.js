const OwnerOTP = require('../../entity/ownerOtp.entity');
const BusinessOTP = require('../../entity/businessOtp.entity');
const { Http } = require('../../util/http.util');

class OtpController {

    async verifyOwnerOtp(req, res) {
        try {
            const { otp } = req.body;
            const savedOtp = await OwnerOTP
                .findOne({ otp: otp })
                .populate('business');

            if (!savedOtp) {
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Invalid OTP'
                    );
            }

            const differenceInMs = (new Date()) - (savedOtp.createdAt);
            const differenceInMinutes = Math.floor(differenceInMs / 60000);
            if (differenceInMinutes > savedOtp.otpValidDurationInMinutes) {
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'OTP Expired'
                    )
            }
            const business = savedOtp.business;
            business.accountEnabled = true;

            await business.save();
            return Http
                .sendResponse(
                    res,
                    Http.Status.SUCCESS,
                    Http.Status.SUCCESS_TRUE,
                    'OK'
                )
        } catch (error) {
            console.log(error);
            return Http
                .sendResponse(
                    res,
                    Http.Status.INTERNAL_SERVER_ERROR,
                    'Internal Server Error'
                );
        }
    }

    async verifyBusinessOtp(req, res) {
        try {
            const { otp } = req.body;
            const savedOtp = await BusinessOTP
                .findOne({ otp: otp })
                .populate('business');

            if (!savedOtp) {
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Invalid OTP'
                    );
            }

            const differenceInMs = (new Date()) - (savedOtp.createdAt);
            const differenceInMinutes = Math.floor(differenceInMs / 60000);
            if (differenceInMinutes > savedOtp.otpValidDurationInMinutes) {
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'OTP Expired'
                    )
            }
            const business = savedOtp.business;
            business.enabled = true;
            await business.save();

            return Http
                .sendResponse(
                    res,
                    Http.Status.SUCCESS,
                    Http.Status.SUCCESS_TRUE,
                    'Ok'
                )
        } catch (error) {
            console.log(error);
            return Http
                .sendResponse(
                    res,
                    Http.Status.INTERNAL_SERVER_ERROR,
                    'Internal Server Error'
                );
        }
    }

}

module.exports = new OtpController();