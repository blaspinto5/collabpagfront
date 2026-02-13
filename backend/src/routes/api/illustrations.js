const express = require('express');
const router = express.Router();
const illustrationController = require('../../controllers/illustrationController');

router.get('/', illustrationController.getAllIllustrations);
router.get('/:id', illustrationController.getIllustrationById);
router.post('/', illustrationController.createIllustration);

module.exports = router;
