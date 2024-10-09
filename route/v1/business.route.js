const businessController = require('../../controller/v1/business.controller');
const businessRoute = require('express').Router();

businessRoute.post('/:ownerId', (req, res) => businessController.createBusiness(req, res));

module.exports = businessRoute;