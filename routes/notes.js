import { Router } from 'express';
import { NoteController } from '../controllers/notes.js';

export const notesRouter = Router();

notesRouter.get('/', NoteController.getAll);
notesRouter.post('/', NoteController.create);

notesRouter.get('/:id', NoteController.getById);
notesRouter.delete('/:id', NoteController.delete);
notesRouter.patch('/:id', NoteController.update);
