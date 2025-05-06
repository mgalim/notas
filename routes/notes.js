import { Router } from 'express';
import { NoteController } from '../controllers/notes.js';

export const createNoteRouter = ({ noteModel }) => {
  const notesRouter = Router();

  const noteController = new NoteController({ noteModel });

  notesRouter.get('/', noteController.getAll);
  notesRouter.post('/', noteController.create);

  notesRouter.get('/:id', noteController.getById);
  notesRouter.delete('/:id', noteController.delete);
  notesRouter.patch('/:id', noteController.update);

  return notesRouter;
};
