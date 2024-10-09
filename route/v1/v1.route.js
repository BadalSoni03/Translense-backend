const v1Router = require('express').Router();
const { Http } = require('../../util/http.util');
const businessRoute = require('./business.route');
const otpRouter = require('./otp.route');
const ownerRouter = require('./owner.route');

v1Router.use('/owner', ownerRouter);
v1Router.use('/business', businessRoute);
v1Router.use('/otp', otpRouter);

v1Router.get('/health-check', (req, res) => {
    return res
        .status(200)
        .json({ message: 'v1 api is live' });
})

module.exports = v1Router;