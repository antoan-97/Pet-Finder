const express = require('express');
const { getAllPets, addPet } = require('../controllers/petController');

const router = express.Router();

// GET request to fetch all pets
router.get('/', getAllPets);
// POST request to fetch all pets
router.post('/', addPet)

module.exports = router;