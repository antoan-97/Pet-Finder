const express = require('express');
const adoptionController = require('../controllers/adoptionController');

const router = express.Router();

router.get('/adoption-dog', adoptionController.getAllDogs);


module.exports = router