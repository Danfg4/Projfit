import { Router } from 'express';

import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import planoRoutes from './plano.routes';
import matriculaRoutes from './matricula.routes';
import instrutorRoutes from './instrutor.routes';
import exercicioRoutes from './exercicio.routes';
import fichaRoutes from './ficha.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/planos', planoRoutes);
routes.use('/matriculas', matriculaRoutes);
routes.use('/instrutores', instrutorRoutes);
routes.use('/exercicios', exercicioRoutes);
routes.use('/fichas', fichaRoutes);

export { routes };