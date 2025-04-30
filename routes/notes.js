const { Router } = require('express');
const NoteController = require('../controllers/notes.js');
const notesRouter = Router();

notesRouter.get('/', NoteController.getAll);
notesRouter.post('/', NoteController.create);

notesRouter.get('/:id', NoteController.getById);
notesRouter.delete('/:id', NoteController.delete);
notesRouter.patch('/:id', NoteController.update);

module.exports = notesRouter;
