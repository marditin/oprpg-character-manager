import express from 'express';
import charactersRouter from './routes/characters.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/characters', charactersRouter);

app.get('/', (req, res) => {
  res.json({
    api: 'Ordem Character API',
    version: '1.0.0',
    routes: ['/characters'],
  });
});

app.use(errorHandler);

export default app;