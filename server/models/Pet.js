const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
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
    age: {
        type: Number,
        required: false,
    },
    description: String,
    imgUrl: String,
    adopted: {
        type: Boolean,
        default: false
    }
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet