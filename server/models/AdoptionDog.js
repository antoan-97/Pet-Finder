const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    location: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    breed: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    age: {
        type: Number,
        required: false,
        min: 0,
        max: 30,
    },
    description: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 200,
    },
    imgUrl: String,
    adopted: {
        type: Boolean,
        default: false
    },
    ownerId: {
        type: String,
        required: true
    }
})

const AdoptionDog = mongoose.model('AdoptionDog', petSchema)
module.exports = AdoptionDog