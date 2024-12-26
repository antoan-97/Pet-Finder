const express = require('express');
const adoptionController = require('../controllers/adoptionController');
const upload = require('../middlewares/multer');
const { image } = require('../config/cloudinary');

const router = express.Router();

router.post('/addAdoptionDog', upload.single('image'), adoptionController.addAdoptionDog);
router.get('/adoptionDog', adoptionController.getAllDogs);
router.get('/adoptionDog/:id', adoptionController.getOneAdoptionDog);


module.exports = router