const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.listNotes);
router.get('/new', notesController.showNewForm);
router.post('/', notesController.createNote);
router.get('/:id', notesController.showNote);
router.post('/:id/delete', notesController.deleteNote);

module.exports = router;
