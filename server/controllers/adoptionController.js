const mongoose = require('mongoose');
const AdoptionPet = require('../models/AdoptionDog');


const getAllDogs = async (req, res) => {
    try {
        const dogs = AdoptionPet.find().sort({ createdAt: -1 })
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dogs', details: error.message });
        console.log('Error with fetching dogs:',error);

    }
}