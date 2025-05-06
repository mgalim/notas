import 'dotenv/config';
import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createNoteRouter } from './routes/notes.js';

export const createApp = ({ noteModel }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(json());
  app.use(corsMiddleware());

  app.use('/notes', createNoteRouter({ noteModel }));
  app.get('/', (req, res) => {
    res.send('Bienvenido a mi API 🚀');
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  const PORT = process.env.PORT ?? 8000;

  app.listen(PORT, () => {
    console.log(`Listening in port http://localhost:${PORT}`);
  });
};
