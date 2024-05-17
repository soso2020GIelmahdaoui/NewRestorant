const express = require('express');
const CategorieController = require('../Controllers/CategorieController.js');

const router = express.Router();

router.route('/').get(CategorieController.afficherCategories).post(CategorieController.ajouterCategory);

router.route('/:id').get(CategorieController.afficherCategorieById).put(CategorieController.modifierCategory).delete(CategorieController.supprimerCategory);

module.exports = router;
