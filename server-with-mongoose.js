import { createApp } from './app.js';
import { NoteModel } from './models/mongoose/note.js';

createApp({ noteModel: NoteModel });
