import { Request, Response } from 'express';

import * as exercicioService from '../services/exercicio.service';

export async function criar(
  req: Request,
  res: Response
): Promise<void> {
  const { nome } = req.body;

  const exercicio = await exercicioService.criarExercicio({
    nome,
  });

  res.status(201).json(exercicio);
}

export async function listar(
  _req: Request,
  res: Response
): Promise<void> {
  const exercicios = await exercicioService.listarExercicios();

  res.status(200).json(exercicios);
}

export async function buscarPorId(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const exercicio =
    await exercicioService.buscarExercicioPorId(id);

  res.status(200).json(exercicio);
}
//Importa solicitações e respostas da página de exercícios pra aba de serviços.