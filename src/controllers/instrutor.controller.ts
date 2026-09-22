import { Request, Response } from 'express';

import * as instrutorService from '../services/instrutor.service';

export async function criar(
  req: Request,
  res: Response
): Promise<void> {
  const { nome, email, senha } = req.body;

  const instrutor = await instrutorService.criarInstrutor({
    nome,
    email,
    senha,
  });

  res.status(201).json(instrutor);
}

export async function listar(
  _req: Request,
  res: Response
): Promise<void> {
  const instrutores = await instrutorService.listarInstrutores();

  res.status(200).json(instrutores);
}

export async function buscarPorId(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const instrutor =
    await instrutorService.buscarInstrutorPorId(id);

  res.status(200).json(instrutor);
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  const { email, senha } = req.body;

  const resultado = await instrutorService.loginInstrutor(
    email,
    senha
  );

  res.status(200).json(resultado);
}
//Parte interna do funconamento do cadastro e login do instrutor a ser entregue à pasta service.