import { Request, Response } from 'express';
import * as matriculaService from '../services/matricula.service';

export async function criar(
  req: Request,
  res: Response
): Promise<void> {
  const {
    clienteId,
    planoId,
    dataInicio,
    status,
  } = req.body;

  const matricula = await matriculaService.criarMatricula({
    clienteId,
    planoId,
    dataInicio: new Date(dataInicio),
    status,
  });

  res.status(201).json(matricula);
}

export async function listar(
  _req: Request,
  res: Response
): Promise<void> {
  const matriculas = await matriculaService.listarMatriculas();

  res.status(200).json(matriculas);
}

export async function buscarPorId(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const matricula =
    await matriculaService.buscarMatriculaPorId(id);

  res.status(200).json(matricula);
}

export async function atualizar(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const {
    clienteId,
    planoId,
    dataInicio,
    status,
  } = req.body;

  const matricula =
    await matriculaService.atualizarMatricula(id, {
      clienteId,
      planoId,
      dataInicio: dataInicio
        ? new Date(dataInicio)
        : undefined,
      status,
    });

  res.status(200).json(matricula);
}
//Pasta responsável pelo funcionamento da matrícula, seja para se matricular, atualizar  a matrícula e registrar a matrícula.