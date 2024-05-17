const express = require('express');
const RepasController = require('../Controllers/RepasController.js');
const upload = require('../MiddleWare/multerConfig.js');

const router = express.Router();

router.route('/').post(upload.single('image'), RepasController.ajouterRepas);
router.route('/:id').put(upload.single('nouvelle-image'), RepasController.modifierRepas);

router.route('/').get(RepasController.afficherRepas);
router.route('/:id').get(RepasController.afficherRepasParId).delete(RepasController.supprimerRepas);

module.exports = router;
