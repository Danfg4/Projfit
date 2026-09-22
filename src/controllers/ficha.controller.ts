import { Request, Response } from 'express';
import * as fichaService from '../services/ficha.service';

export async function criar(req: Request, res: Response) {
  const ficha = await fichaService.criarFicha({
    clienteId: Number(req.body.clienteId),
    instrutorId: Number(req.body.instrutorId),
    objetivo: req.body.objetivo,
    dataElaboracao: new Date(req.body.dataElaboracao),
    exercicios: req.body.exercicios,
  });

  return res.status(201).json(ficha);
}

export async function listar(req: Request, res: Response) {
  const fichas = await fichaService.listarFichas();

  return res.json(fichas);
}

export async function buscarPorId(req: Request, res: Response) {
  const id = Number(req.params.id);

  const ficha = await fichaService.buscarFichaPorId(id);

  return res.json(ficha);
}
//É o Funcionamento interno da ficha, é exportado para o service pra entregar o serviço dessa página.