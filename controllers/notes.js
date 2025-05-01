const NoteModel = require('../models/mock/note.js');
const { validateNote, validatePartialNote } = require('../schemas/notes.js');

class NoteController {
  static async getAll(req, res) {
    const { category } = req.query;
    const notes = await NoteModel.getAll({ category });
    res.json(notes);
  }
  static async getById(req, res) {
    const id = req.params.id;
    const note = await NoteModel.getById(id);

    if (note) return res.json(note);
    res.status(404).json({ error: 'Nota no encontrada' });
  }
  static async create(req, res) {
    const result = validateNote(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return res.status(400).json({ error: errors });
    }

    const newNote = await NoteModel.create(result.data);
    res.status(201).json(newNote);
  }

  static async delete(req, res) {
    const id = req.params.id;
    const result = await NoteModel.delete(id);

    if (result === false) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota borrada.' });
  }

  static async update(req, res) {
    const result = validatePartialNote(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return res.status(400).json({ error: errors });
    }

    const id = req.params.id;

    const updatedNote = await NoteModel.update(id, result.data);

    if (updatedNote === false) {
      return res.status(400).json({ error: 'Nota no encontrada' });
    }

    res.json(updatedNote);
  }
}

module.exports = NoteController;
