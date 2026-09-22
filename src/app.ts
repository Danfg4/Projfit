import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/error.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';


const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'FitMaster API está no ar!' });
});

app.use(errorHandler);

export { app };

//Faz parte do funcionamento geral do site, principalmente por importar muitas funções e exportar a si.