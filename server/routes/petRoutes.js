const express = require('express');
const upload = require('../middlewares/multer');

const petController = require('../controllers/petController')

const router = express.Router();
//lost pets
router.post('/addLostPet', upload.single('image'), petController.addLostPet);   
router.get('/lost/:id', petController.getOneLost);
router.get('/lost', petController.getAllLost);
router.delete('/lost/:id', petController.deleteLostPet);
router.put('/lost/:id', petController.updateLostPet);
//found pets
router.post('/addFoundPet', upload.single('image'), petController.addFoundPet);
router.get('/found', petController.getAllFound);
router.get('/found/:id', petController.getOneFound);
router.delete('/found/:id', petController.deleteFoundPet);
router.put('/found/:id', petController.updateFoundPet);


module.exports = router;
