const transporter = require("../config/nodemailer.config");

const sendOTP = async (data) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: data.toAddress,
        subject: data.subject,
        text: data.body
    }
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(response.response);
    } catch (error) {
        console.log(error);
        throw new Error('Error while sending OTP mail: ' + error.message);
    }
}

module.exports = sendOTP;