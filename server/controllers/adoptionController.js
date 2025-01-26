const mongoose = require('mongoose');
const AdoptionDog = require('../models/AdoptionDog');
const AdoptionCat = require('../models/AdoptionCat');

const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const { log } = require('console');



const getAllDogs = async (req, res) => {
    try {
        const dogs = await AdoptionDog.find().sort({ createdAt: -1 })
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dogs', details: error.message });
        console.log('Error with fetching dogs:', error);

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
            ownerId,
            adopted: false
        });
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error('Error in addAdoptionDog:', error);
        res.status(400).json({ error: 'Failed to add adopted dog', details: error.message });
    }
};

const addAdoptionCat = async (req, res) => {
    try {
        const { name, breed, age, location, description, ownerId } = req.body;
        let imgUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'adoption_cats',
            });
            imgUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        // Create new cat with ownerId
        const newPet = new AdoptionCat({
            name,
            breed,
            age,
            location,
            description,
            imgUrl,
            ownerId,
            adopted: false
        });
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error('Error in addAdoptionCat:', error);
        res.status(400).json({ error: 'Failed to add adopted cat', details: error.message });
    }
};

const getAllCats = async (req, res) => {
    try {
        const cats = await AdoptionCat.find().sort({ createdAt: -1 })
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cats', details: error.message });
        console.log('Error with fetching cats:', error);
    }
}

const getOneCat = async (req, res) => {
    try {
        const { id } = req.params;
        const cat = await AdoptionCat.findById(id);
        res.status(200).json(cat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cat', details: error.message });
    }
}

const deleteAdoptionDog = async (req, res) => {
    try {
        const { id } = req.params;
        const dog = await AdoptionDog.findById(id);

        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        // Optional: Check if the user is the owner
        // if (dog.ownerId !== req.user.id) {
        //     return res.status(403).json({ error: 'Not authorized' });
        // }

        await AdoptionDog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Dog deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAdoptionDog:', error);
        res.status(500).json({ error: 'Failed to delete dog', details: error.message });
    }
};

const deleteAdoptionCat = async (req, res) => {
    try {
        const { id } = req.params;
        const cat = await AdoptionCat.findById(id);

        if (!cat) {
            return res.status(404).json({ error: 'Cat not found' });
        }
        await AdoptionCat.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cat deleted successfully' });
    } catch (error) {
        console.log('Error in deleteAdoptionCat:', error);
        res.status(500).json({ error: 'Failed to delete cat', details: error.message });
    }
}

module.exports = {
    getAllDogs,
    addAdoptionDog,
    getOneAdoptionDog,
    deleteAdoptionDog,
    deleteAdoptionCat,
    addAdoptionCat,
    getAllCats,
    getOneCat
}
