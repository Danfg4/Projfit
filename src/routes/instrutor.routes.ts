import { Router } from 'express';

import * as instrutorController from '../controllers/instrutor.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/instrutores/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Faz login de um instrutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInstrutor'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaLoginInstrutor'
 *       401:
 *         description: E-mail ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/login', instrutorController.login);

/**
 * @openapi
 * /api/instrutores:
 *   post:
 *     tags:
 *       - Instrutores
 *     summary: Cadastra um novo instrutor
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
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Souza
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@fitmaster.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Instrutor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrutor'
 *       400:
 *         description: Já existe um instrutor com esse e-mail
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
  instrutorController.criar
);

/**
 * @openapi
 * /api/instrutores:
 *   get:
 *     tags:
 *       - Instrutores
 *     summary: Lista todos os instrutores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instrutores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instrutor'
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
  instrutorController.listar
);

/**
 * @openapi
 * /api/instrutores/{id}:
 *   get:
 *     tags:
 *       - Instrutores
 *     summary: Busca um instrutor pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:sd
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Instrutor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrutor'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Instrutor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/:id',
  authMiddleware,
  instrutorController.buscarPorId
);

export default router;