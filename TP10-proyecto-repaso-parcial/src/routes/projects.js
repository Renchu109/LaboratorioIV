const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProyect);
router.get('/:id', projectController.getProject, projectController.getProjectById);
router.put('/:id', projectController.getProject, projectController.updateProjectById);
router.patch('/:id', projectController.getProject, projectController.patchProjectById);
router.delete('/:id', projectController.getProject, projectController.deleteProjectById);
router.put('/:id/add-researcher/:researcherId', projectController.getProject, projectController.getResearcherId, projectController.asignResearcherById);

module.exports = router;