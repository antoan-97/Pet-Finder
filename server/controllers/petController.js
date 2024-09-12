const Pet = require('../models/Pet');

// Get all pets
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pets' });
    }
};

// Add a new pet
const addPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add pet' });
    }
};

module.exports = { getAllPets, addPet };