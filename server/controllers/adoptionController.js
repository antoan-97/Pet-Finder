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
const addAdoptionDog = async (req, res) => {
    try {
        const { name, breed, age, location, description } = req.body;

        let imgUrl = '';
        if (req.file) {
            console.log('Uploading file:', req.file.path);
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'adoption_dogs',
            });
            imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.log('No file uploaded');
        }

        // Create a new pet with the uploaded image URL
        const newPet = new AdoptionDog({
            name,
            breed,
            age,
            location,
            description,
            imgUrl,
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in addAdoptionDog:', error);
        res.status(400).json({ error: 'Failed to add adopted dog', details: error.message });
    }
}

module.exports = {
    getAllDogs,
    addAdoptionDog
}
