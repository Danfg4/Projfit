import { Router } from 'express';

import * as planoController from '../controllers/plano.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/** @openapi
 * /api/planos:
 *   post:
 *     tags:
 *       - Planos
 *     summary: Cadastra um novo plano
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - valorMensal
 *               - duracaoMeses
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Plano Mensal
 *               valorMensal:
 *                 type: number
 *                 format: float
 *                 example: 99.90
 *               duracaoMeses:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, planoController.criar);

/** @openapi
 * /api/planos:
 *   get:
 *     tags:
 *       - Planos
 *     summary: Lista todos os planos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plano'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/', authMiddleware, planoController.listar);

/** @openapi
 * /api/planos/{id}:
 *   get:
 *     tags:
 *       - Planos
 *     summary: Busca um plano pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Plano encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Plano não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, planoController.buscarPorId);

export default router;