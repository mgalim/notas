import { validateNote, validatePartialNote } from '../schemas/notes.js';

export class NoteController {
  constructor({ noteModel }) {
    this.noteModel = noteModel;
  }

  getAll = async (req, res) => {
    try {
      const { category } = req.query;
      const notes = await this.noteModel.getAll({ category });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const note = await this.noteModel.getById(id);

      if (note === null) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }

      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };
  create = async (req, res) => {
    const result = validateNote(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return res.status(400).json({ error: errors });
    }

    const newNote = await this.noteModel.create(result.data);
    res.status(201).json(newNote);
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.noteModel.delete(id);

      if (result === false) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }

      res.json({ message: 'Nota borrada.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    const result = validatePartialNote(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return res.status(400).json({ error: errors });
    }

    const id = req.params.id;
    try {
      const updatedNote = await this.noteModel.update(id, result.data);

      if (updatedNote === false) {
        return res.status(404).json({ error: 'Nota no encontrada' });
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
