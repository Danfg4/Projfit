import { Router } from 'express';

import * as matriculaController from '../controllers/matricula.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/** @openapi
 * /api/matriculas:
 *   post:
 *     tags:
 *       - Matrículas
 *     summary: Cadastra uma nova matrícula
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
 *               - planoId
 *               - dataInicio
 *               - status
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               planoId:
 *                 type: integer
 *                 example: 1
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-04T00:00:00.000Z"
 *               status:
 *                 type: string
 *                 example: Ativa
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Matricula'
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
  matriculaController.criar
);

/** @openapi
 * /api/matriculas:
 *   get:
 *     tags:
 *       - Matrículas
 *     summary: Lista todas as matrículas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de matrículas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Matricula'
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
  matriculaController.listar
);

/** @openapi
 * /api/matriculas/{id}:
 *   get:
 *     tags:
 *       - Matrículas
 *     summary: Busca uma matrícula pelo id
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
 *         description: Matrícula encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Matricula'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/:id',
  authMiddleware,
  matriculaController.buscarPorId
);

/** @openapi
 * /api/matriculas/{id}:
 *   put:
 *     tags:
 *       - Matrículas
 *     summary: Atualiza uma matrícula pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               planoId:
 *                 type: integer
 *                 example: 2
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-04T00:00:00.000Z"
 *               status:
 *                 type: string
 *                 example: Ativa
 *     responses:
 *       200:
 *         description: Matrícula atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Matricula'
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
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.put(
  '/:id',
  authMiddleware,
  matriculaController.atualizar
);

export default router;