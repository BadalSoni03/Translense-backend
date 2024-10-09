const ownerRouter = require('express').Router();
const ownerController = require('../../controller/v1/owner.controller');

ownerRouter.post('/', (req, res) => ownerController.createOwner(req, res));

module.exports = ownerRouter;