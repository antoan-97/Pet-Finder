const express = require('express');
const upload = require('../middlewares/multer');
const { image } = require('../config/cloudinary');

const adoptionController = require('../controllers/adoptionController');

const router = express.Router();

router.post('/addAdoptionDog', upload.single('image'), adoptionController.addAdoptionDog);
router.get('/adoptionDog', adoptionController.getAllDogs);
router.get('/adoptionDog/:id', adoptionController.getOneAdoptionDog);
router.delete('/adoptionDog/:id', adoptionController.deleteAdoptionDog);
router.put('/adoptionDog/:id', upload.single('image'), adoptionController.updateAdoptionDog);

router.post('/addAdoptionCat', upload.single('image'), adoptionController.addAdoptionCat);
router.get('/adoptionCat', adoptionController.getAllCats);
router.get('/adoptionCat/:id', adoptionController.getOneCat);
router.delete('/adoptionCat/:id', adoptionController.deleteAdoptionCat);
router.put('/adoptionCat/:id', upload.single('image'), adoptionController.updateAdoptionCat);

module.exports = router