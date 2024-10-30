const express = require('express');
const petController = require('../controllers/petController')
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/addFoundPet', upload.single('image'), petController.addFoundPet);
router.post('/addLostPet', upload.single('image'), petController.addLostPet);   
router.get('/found', petController.getAllPets);
router.get('/lost', petController.getAllLost);
router.get('/:id', petController.getOnePet);

module.exports = router;
