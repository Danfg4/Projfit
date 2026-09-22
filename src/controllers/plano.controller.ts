import { Request, Response } from 'express';
import * as planoService from '../services/plano.service';

export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, valorMensal, duracaoMeses } = req.body;

  const plano = await planoService.criarPlano({
    nome,
    valorMensal,
    duracaoMeses,
  });

  res.status(201).json(plano);
}

export async function listar(
  _req: Request,
  res: Response
): Promise<void> {
  const planos = await planoService.listarPlanos();

  res.status(200).json(planos);
}

export async function buscarPorId(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const plano = await planoService.buscarPlanoPorId(id);

  res.status(200).json(plano);
}
//Página responsável pelo plano do aluno que se matriculou, o plano é escolhido e define o valor da mensalidade e duração.