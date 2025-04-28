const cors = require('cors');

const ACCEPTED_ORIGINS = ['http://localhost:8000', 'https://miweb.com'];

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS no permitido'), false);
    },
  });

module.exports = { corsMiddleware };
