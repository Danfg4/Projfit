import { Router } from 'express';

import * as exercicioController from '../controllers/exercicio.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/** @openapi
 * /api/exercicios:
 *   post:
 *     tags:
 *       - Exercícios
 *     summary: Cadastra um novo exercício
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
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Supino reto
 *     responses:
 *       201:
 *         description: Exercício criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercicio'
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
 */
router.post(
  '/',
  authMiddleware,
  exercicioController.criar
);

/** @openapi
 * /api/exercicios:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Lista todos os exercícios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de exercícios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercicio'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/',
  authMiddleware,
  exercicioController.listar
);

/** @openapi
 * /api/exercicios/{id}:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Busca um exercício pelo id
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
 *         description: Exercício encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercicio'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Exercício não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/:id',
  authMiddleware,
  exercicioController.buscarPorId
);

export default router;