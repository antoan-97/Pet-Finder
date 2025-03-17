const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    location: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    breed: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    description: String,
    imgUrl: String,
    ownerId: {
        type: String,
        required: true
    }
})

const FoundPet = mongoose.model('FoundPet', petSchema)
module.exports = FoundPet