const express = require('express');
const petController = require('../controllers/petController')
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/addFoundPet', upload.single('image'), petController.addFoundPet);
router.post('/addLostPet', upload.single('image'), petController.addLostPet);   
router.get('/found', petController.getAllFound);
router.get('/lost', petController.getAllLost);
router.get('/found/:id', petController.getOneFound);
router.get('/lost/:id', petController.getOneLost);

module.exports = router;
