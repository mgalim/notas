const express = require('express');
const app = express();
const notesRouter = require('./routes/notes.js');
const { corsMiddleware } = require('./middlewares/cors.js');

app.disable('x-powered-by');
app.use(express.json());
app.use(corsMiddleware());

app.use('/notes', notesRouter);
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
