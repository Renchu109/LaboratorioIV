const express = require('express');
const researcherController =  require('../controllers/researcherController');
const router = express.Router();

router.get('/', researcherController.getAllResearchers)
router.post('/', researcherController.createResearcher)
router.get('/:id', researcherController.getResearcher, researcherController.getResearcherById)
router.put('/:id', researcherController.getResearcher, researcherController.updateResearcherById)
router.patch('/:id', researcherController.getResearcher, researcherController.patchResearcherById)
router.delete('/:id', researcherController.getResearcher, researcherController.deleteResearcherById)

module.exports = router