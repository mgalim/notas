import { createApp } from './app.js';
import { NoteModel } from './models/mongo/note.js';

createApp({ noteModel: NoteModel });
