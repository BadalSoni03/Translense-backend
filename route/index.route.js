const router = require('express').Router();
const v1Router = require('./v1/v1.route');

router.use('/v1', v1Router);

module.exports = router;