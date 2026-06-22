import express from 'express';
import charactersRouter from './routes/characters.js';
import equipmentsRouter from './routes/equipments.js';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/characters', charactersRouter);

app.use('/equipments', equipmentsRouter);

app.get('/', (req, res) => {
  res.json({
    api: 'Ordem Character API',
    version: '1.0.0',
    routes: [
      '/characters',
      '/equipments'
    ]
  });
});

app.use(errorHandler);

export default app;