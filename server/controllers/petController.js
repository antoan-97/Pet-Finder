const FoundPet = require('../models/FoundPet');
const LostPet = require('../models/LostPet');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Add found pet (with image upload to Cloudinary)
const addFoundPet = async (req, res) => {
    try {
        const { kind, location, breed, phone, description } = req.body;

        let imgUrl = '';
        if (req.file) {
            console.log('Uploading file:', req.file.path);
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'found_pets',
            });
            imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.log('No file uploaded');
        }

        // Create a new pet with the uploaded image URL
        const newPet = new FoundPet({
            kind,
            location,
            breed,
            phone,
            description,
            imgUrl,
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in addFoundPet:', error);
        res.status(400).json({ error: 'Failed to add found pet', details: error.message });
    }
};
const addLostPet = async (req, res) => {
    try {
        const { name, kind, breed, lastSeenLocation, lastSeenDate, phone, description } = req.body;

        let imgUrl = '';
        if (req.file) {
            console.log('Uploading file:', req.file.path);
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lost_pets',
            });
            imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.log('No file uploaded');
        }

        // Create a new pet with the uploaded image URL
        const newPet = new LostPet({
            name,
            kind,
            breed,
            lastSeenLocation,
            lastSeenDate,
            phone,
            description,
            imgUrl,
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in addLostPet:', error);
        res.status(400).json({ error: 'Failed to add lost pet', details: error.message });
    }
}

const getAllPets = async (req, res) => {
    try {
        const pets = await FoundPet.find().sort({ createdAt: -1 });  // Sort by creation date, newest first
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error in getAllPets:', error);
        res.status(500).json({ error: 'Failed to fetch pets', details: error.message });
    }
};

const getAllLost = async (req, res) => {
    try {
        const pets = await LostPet.find().sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error in getAllLost:', error);
        res.status(500).json({ error: 'Failed to fetch lost pets', details: error.message });
    }
};

const getOnePet = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching pet with id:', id);

        // Check if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid pet ID format' });
        }

        const pet = await FoundPet.findById(id);
        console.log('Found pet:', pet);

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error in getOnePet:', error);
        res.status(500).json({ error: 'Failed to fetch pet', details: error.message });
    }
};

module.exports = { addFoundPet, addLostPet, getAllPets, getAllLost, getOnePet };
