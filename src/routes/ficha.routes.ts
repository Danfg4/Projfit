import { Router } from 'express';

import * as fichaController from '../controllers/ficha.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/** @openapi
 * /api/fichas:
 *   post:
 *     tags:
 *       - Fichas de treino
 *     summary: Cadastra uma nova ficha de treino
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - instrutorId
 *               - objetivo
 *               - dataElaboracao
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               instrutorId:
 *                 type: integer
 *                 example: 1
 *               objetivo:
 *                 type: string
 *                 example: Hipertrofia
 *               dataElaboracao:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-04T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Ficha de treino criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FichaTreino'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Cliente ou instrutor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, fichaController.criar);

/** @openapi
 * /api/fichas:
 *   get:
 *     tags:
 *       - Fichas de treino
 *     summary: Lista todas as fichas de treino
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fichas de treino
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FichaTreino'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/', authMiddleware, fichaController.listar);

/** @openapi
 * /api/fichas/{id}:
 *   get:
 *     tags:
 *       - Fichas de treino
 *     summary: Busca uma ficha de treino pelo id
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
 *         description: Ficha de treino encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FichaTreino'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Ficha de treino não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, fichaController.buscarPorId);

export default router;