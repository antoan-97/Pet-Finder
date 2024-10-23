const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    breed: {
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