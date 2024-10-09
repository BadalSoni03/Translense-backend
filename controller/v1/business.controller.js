const { Http } = require('../../util/http.util');
const Business = require('../../entity/business.entity');
const { generate4DigitOtp, isValidMongoDbId } = require('../../util/utility.util');
const sendOTP = require('../../util/mail.util');
const { mongoose } = require('mongoose');
const Owner = require('../../entity/owner.entity');
const BusinessOTP = require('../../entity/businessOtp.entity');

class BusinessController {

    async createBusiness(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { businessName, email, address, mobileNumber } = req.body;
            const { ownerId } = req.params;
            const businessExists = await Business.findOne({
                $or: [
                    { mobileNumber: mobileNumber },
                    { email: email }
                ]
            });
            if (businessExists) {
                session.abortTransaction();
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Email or Contact number already registered'
                    );
            }

            if (!isValidMongoDbId(ownerId)) {
                session.abortTransaction();
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Invalid Owner Id'
                    );
            }
            const owner = await Owner.findById(ownerId);
            if (!owner.accountEnabled) {
                session.abortTransaction();
                return Http
                    .sendResponse(
                        res,
                        Http.Status.BAD_REQUEST,
                        Http.Status.SUCCESS_FALSE,
                        'Your account is not enabled yet'
                    );
            }
            const business = new Business({
                businessName,
                email,
                address,
                mobileNumber,
                owner: owner
            });
            await business.save({ session });

            owner.business = business;
            await owner.save({ session });

            const data = {
                businessId: business._id
            }

            this.sendMail(email);

            session.commitTransaction();
            return Http
                .sendResponse(
                    res,
                    Http.Status.CREATED,
                    Http.Status.SUCCESS_TRUE,
                    'Business account created successfully',
                    data
                )
        } catch (error) {
            session.abortTransaction();
            return Http
                .sendResponse(
                    res,
                    Http.Status.INTERNAL_SERVER_ERROR,
                    Http.Status.SUCCESS_FALSE,
                    'Something went wrong while creating your business account: ' + error
                );
        } finally {
            session.endSession();
        }
    }

    async sendMail(email, business) {
        const data = {};
        data.otp = generate4DigitOtp();
        data.toAddress = email;
        data.body = 'Your business registration OTP is ' + data.otp + ' which is valid for 10 minutes. DO NOT SHARE IT WITH ANYONE';
        data.subject = 'Business Registration OTP';

        const otp = new BusinessOTP({
            otp: data.otp,
            business
        });
        await otp.save();

        sendOTP(data);
    }

}

module.exports = new BusinessController();