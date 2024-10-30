const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    lastSeenDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastSeenLocation: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: String,
    imgUrl: String,
})

const FoundPet = mongoose.model('Pet', petSchema)
module.exports = FoundPet