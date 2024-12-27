const mongoose = require('mongoose');
const AdoptionDog = require('../models/AdoptionDog');

const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');



const getAllDogs = async (req, res) => {
    try {
        const dogs = await AdoptionDog.find().sort({ createdAt: -1 })
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dogs', details: error.message });
        console.log('Error with fetching dogs:',error);

    }
}

const getOneAdoptionDog = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await AdoptionDog.findById(id);
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch adoption dog', details: error.message });
    }
};

const addAdoptionDog = async (req, res) => {
    try {
        const { name, breed, age, location, description, ownerId } = req.body;
        console.log('Received ownerId:', ownerId); // Debug log

        let imgUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'adoption_dogs',
            });
            imgUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        // Create new dog with ownerId
        const newPet = new AdoptionDog({
            name,
            breed,
            age,
            location,
            description,
            imgUrl,
            ownerId, // Make sure this field exists in your schema
            adopted: false
        });

        console.log('New pet before save:', newPet); // Debug log
        const savedPet = await newPet.save();
        console.log('Saved pet:', savedPet); // Debug log

        res.status(201).json(savedPet);
    } catch (error) {
        console.error('Error in addAdoptionDog:', error);
        res.status(400).json({ error: 'Failed to add adopted dog', details: error.message });
    }
};

module.exports = {
    getAllDogs,
    addAdoptionDog,
    getOneAdoptionDog
}
