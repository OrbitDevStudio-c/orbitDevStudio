const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');

// Route to handle form submission with resume upload
router.post('/', applyController.uploadResume, applyController.submitApplication);

module.exports = router;
