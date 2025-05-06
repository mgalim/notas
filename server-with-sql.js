import { createApp } from './app.js';
import { NoteModel } from './models/mysql/note.js';

createApp({ noteModel: NoteModel });
