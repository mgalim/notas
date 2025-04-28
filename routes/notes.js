const { Router } = require('express');
const { validateNote, validatePartialNote } = require('../schemas/notes.js');
const NoteModel = require('../models/note.js');
const notesRouter = Router();

notesRouter.get('/', async (req, res) => {
  const notes = await NoteModel.getAll();
  res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.getById(id);

  if (note) return res.json(note);
  res.status(404).json({ error: 'Nota no encontrada' });
});

notesRouter.post('/', async (req, res) => {
  const result = validateNote(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const newNote = await NoteModel.create(result.data);
  res.status(201).json(newNote);
});

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await NoteModel.delete(id);

  if (result === false) {
    return res.status(404).json({ error: 'Nota no encontrada' });
  }

  res.status(204).end();
});

notesRouter.patch('/:id', async (req, res) => {
  const result = validatePartialNote(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const id = req.params.id;

  const updatedNote = await NoteModel.update(id, result.data);

  if (updatedNote === false) {
    return res.status(400).json({ error: 'Nota no encontrada' });
  }

  res.json(updatedNote);
});

module.exports = notesRouter;
