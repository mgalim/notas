// Import { NoteModel } from '../models/mock/note.js';
import { NoteModel } from '../models/mysql/note.js';
import { validateNote, validatePartialNote } from '../schemas/notes.js';

export class NoteController {
  static async getAll(req, res) {
    try {
      const { category } = req.query;
      const notes = await NoteModel.getAll({ category });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async getById(req, res) {
    try {
      const id = req.params.id;
      const note = await NoteModel.getById(id);

      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error });
    }
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
    try {
      const updatedNote = await NoteModel.update(id, result.data);

      if (updatedNote === false) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
