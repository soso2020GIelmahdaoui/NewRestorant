const express = require('express');
const NewsletterController = require('../Controllers/NewsletterController.js');

const router = express.Router();

router.route('/').get(NewsletterController.afficherNewsletters).post(NewsletterController.createNewsletter);

router.route('/:id').get(NewsletterController.afficherNewsletterParId).put(NewsletterController.updateNewsletter).delete(NewsletterController.supprimerNewsletter);

module.exports = router;
