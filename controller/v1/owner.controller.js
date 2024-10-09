const { Http } = require('../../util/http.util');
const Owner = require('../../entity/owner.entity');
const { generate4DigitOtp } = require('../../util/utility.util');
const sendOTP = require('../../util/mail.util');
const OwnerOTP = require('../../entity/ownerOtp.entity');

class OwnerController {

    async createOwner(req, res) {
        try {
            const { fullName, email, address, mobileNumber } = req.body;
            const ownerExists = await Owner.findOne({
                $or: [
                    { mobileNumber: mobileNumber },
                    { email: email }
                ]
            });
            if (ownerExists) {
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Email or Contact number already registered'
                    );
            }
            const owner = new Owner({
                fullName,
                email,
                address,
                mobileNumber
            });
            await owner.save();

            const data = {
                ownerId: owner._id
            }

            this.sendMail(email);
            return Http
                .sendResponse(
                    res,
                    Http.Status.CREATED,
                    Http.Status.SUCCESS_TRUE,
                    'Account created successfully',
                    data
                )
        } catch (error) {
            return Http
                .sendResponse(
                    res,
                    Http.Status.INTERNAL_SERVER_ERROR,
                    Http.Status.SUCCESS_FALSE,
                    'Something went wrong while creating user: ' + error
                );
        }
    }

    async sendMail(email, owner) {
        const data = {};
        data.otp = generate4DigitOtp();
        data.toAddress = email;
        data.body = 'Your owner registration OTP is ' + data.otp + ' which is valid for 10 minutes. DO NOT SHARE IT WITH ANYONE';
        data.subject = 'Registration OTP';

        const otp = new OwnerOTP({
            otp: data.otp,
            owner
        });
        await otp.save();

        sendOTP(data);
    }

}

module.exports = new OwnerController();