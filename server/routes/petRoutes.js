const express = require('express');
const petController = require('../controllers/petController')
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/addFoundPet', upload.single('image'), petController.addFoundPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getOnePet);

module.exports = router;
