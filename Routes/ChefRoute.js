const express = require('express');
const ChefController = require('../Controllers/ChefController.js');
const upload = require('../MiddleWare/multerConfig.js');

const router = express.Router();

router.get('/', ChefController.afficherChefs);

router.get('/:id', ChefController.afficherChefParId);
router.post('/', upload.single('image'), ChefController.ajouterChef);
router.put('/:id', upload.single('nouvelle-image'), ChefController.modifierChef); 
router.delete('/:id', ChefController.supprimerchef);

module.exports = router;
