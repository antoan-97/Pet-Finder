const mongoose = require('mongoose');

const FoundPet = require('../models/FoundPet');
const LostPet = require('../models/LostPet');

const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');



//Found Pets
// Add found pet (with image upload to Cloudinary)
const addFoundPet = async (req, res) => {
    try {
        const { kind, location, breed, phone, description, ownerId } = req.body;

        let imgUrl = '';
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'found_pets',
            });
            imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.error('No file uploaded');
        }

        // Create a new pet with the uploaded image URL
        const newPet = new FoundPet({
            kind,
            location,
            breed,
            phone,
            description,
            imgUrl,
            ownerId
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in addFoundPet:', error);
        res.status(400).json({ error: 'Failed to add found pet', details: error.message });
    }
};

const getOneFound = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid pet ID format' });
        }

        const pet = await FoundPet.findById(id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error in getOneFound:', error);
        res.status(500).json({ error: 'Failed to fetch found pet', details: error.message });
    }
};

const getAllFound = async (req, res) => {
    try {
        const pets = await FoundPet.find().sort({ createdAt: -1 });  // Sort by creation date, newest first
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error in getAllFound :', error);
        res.status(500).json({ error: 'Failed to fetch pets', details: error.message });
    }
};

const deleteFoundPet = async (req, res) => {
    try {
        const { id } = req.params;
        await FoundPet.findByIdAndDelete(id);
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error in deleteFoundPet:', error);
        res.status(500).json({ error: 'Failed to delete pet', details: error.message });
    }
};

const updateFoundPet = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedFields } = req.body;
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'found_pets',
            });
            updatedFields.imgUrl = result.secure_url;
            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);

            // Get the old pet to delete its image
            const pet = await FoundPet.findById(id);
            if (pet.imgUrl) {
                const publicId = pet.imgUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`found_pets/${publicId}`);
            }
        }
        await FoundPet.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ message: 'Pet updated successfully' });

    } catch (error) {
        console.error('Error in updateFoundPet:', error);
        res.status(500).json({ error: 'Failed to update pet', details: error.message });
    }
};


//Lost Pets
const addLostPet = async (req, res) => {
    try {
        const { name, kind, breed, lastSeenLocation, lastSeenDate, phone, description, ownerId } = req.body;

        let imgUrl = '';
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lost_pets',
            });
            imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.error('No file uploaded');
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
            ownerId
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in addLostPet:', error);
        res.status(400).json({ error: 'Failed to add lost pet', details: error.message });
    }
}



const getAllLost = async (req, res) => {
    try {
        const pets = await LostPet.find().sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error in getAllLost:', error);
        res.status(500).json({ error: 'Failed to fetch lost pets', details: error.message });
    }
};



const getOneLost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid pet ID format' });
        }

        const pet = await LostPet.findById(id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error in getOneLost:', error);
        res.status(500).json({ error: 'Failed to fetch lost pet', details: error.message });
    }
};



const deleteLostPet = async (req, res) => {
    try {
        const { id } = req.params;
        await LostPet.findByIdAndDelete(id);
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error in deleteLostPet:', error);
        res.status(500).json({ error: 'Failed to delete pet', details: error.message });
    }
};



const updateLostPet = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedFields } = req.body;
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lost_pets',
            });
            updatedFields.imgUrl = result.secure_url;

            // Delete the file from the uploads folder after uploading to Cloudinary
            fs.unlinkSync(req.file.path);

            const pet = await LostPet.findById(id);
            if (pet.imgUrl) {
                const publicId = pet.imgUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`lost_pets/${publicId}`);
            }
        }
        await LostPet.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ message: 'Pet updated successfully' });
    } catch (error) {
        console.error('Error in updateLostPet:', error);
        res.status(500).json({ error: 'Failed to update pet', details: error.message });
    }
};


module.exports = { addFoundPet, addLostPet, getAllFound, getAllLost, getOneFound, getOneLost, deleteFoundPet, deleteLostPet, updateFoundPet, updateLostPet };
