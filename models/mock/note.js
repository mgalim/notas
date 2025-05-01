const notes = require('../../notes.json');
const { generateId } = require('../../utils/noteHelper.js');

class NoteModel {
  static async getAll({ category }) {
    if (category) {
      return notes.filter((note) =>
        note.category.some((g) => g.toLowerCase() === category.toLowerCase()),
      );
    }
    return notes;
  }

  static async getById(id) {
    const note = notes.find((note) => note.id === parseInt(id));
    return note;
  }

  static async create(input) {
    const newNote = {
      id: generateId(notes),
      ...input,
    };

    notes.push(newNote);
    return newNote;
  }

  static async delete(id) {
    const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
    if (noteIndex === -1) return false;
    notes.splice(noteIndex, 1);
    return true;
  }

  static async update(id, input) {
    const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
    if (noteIndex === -1) return false;

    notes[noteIndex] = {
      ...notes[noteIndex],
      ...input,
    };

    return notes[noteIndex];
  }
}

module.exports = NoteModel;
