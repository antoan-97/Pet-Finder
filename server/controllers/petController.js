const FoundPet = require('../models/FoundPet');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

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

module.exports = { addFoundPet };
