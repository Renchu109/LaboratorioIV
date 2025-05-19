const express = require('express');
const publicationController = require('../controllers/publicationController');
const router = express.Router();

router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getPublication, publicationController.getPublicationById)
router.post('/', publicationController.createPublication);
router.put('/:id', publicationController.getPublication, publicationController.updatePublicationById)
router.patch('/:id', publicationController.getPublication, publicationController.patchPublicationById)
router.delete('/:id', publicationController.getPublication, publicationController.deletePublicationById)

module.exports = router