const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: true,
    },
    kind: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: true,
    },
    breed: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: true,
    },
    lastSeenDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastSeenLocation: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: true,
    },
    phone: {
        type: String,
        minLength: 1,
        maxLength: 20,
            required: true,
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 200,
    },
    imgUrl: String,
    ownerId: {
        type: String,
        required: true,
    }
})

const LostPet = mongoose.model('LostPet', petSchema)
module.exports = LostPet