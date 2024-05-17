const express = require('express');
const RestaurantController = require('../Controllers/RestaurantController.js');

const router = express.Router();

router.route('/').get(RestaurantController.afficherRestaurant).post(RestaurantController.ajouterRestorant);

router.route('/:id').get(RestaurantController.afficherRestorantsById).put(RestaurantController.modifierRestorant).delete(RestaurantController.supprimerRestorant);

module.exports = router;
