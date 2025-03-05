const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const curriculumController = require('../controllers/curriculumController');

router.use(authMiddleware);

router.post('/', curriculumController.createCurriculum);
router.get('/', curriculumController.getCurriculums);
router.put('/:id', curriculumController.updateCurriculum);
router.delete('/:id', curriculumController.deleteCurriculum)

module.exports = router;
