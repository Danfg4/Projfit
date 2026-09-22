import bcrypt from 'bcryptjs';

import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';
import jwt from 'jsonwebtoken';

interface CriarInstrutorInput {
  nome: string;
  email: string;
  senha: string;
}

export async function criarInstrutor(dados: CriarInstrutorInput) {
  const instrutorExistente = await prisma.instrutor.findUnique({
    where: {
      email: dados.email,
    },
  });

  if (instrutorExistente) {
    throw new AppError('Já existe um instrutor com esse e-mail.', 400);
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  return prisma.instrutor.create({
    data: {
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
    },
    select: {
      id: true,
      nome: true,
      email: true,
    },
  });
}

export async function listarInstrutores() {
  return prisma.instrutor.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export async function buscarInstrutorPorId(id: number) {
  const instrutor = await prisma.instrutor.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      email: true,
    },
  });

  if (!instrutor) {
    throw new AppError('Instrutor não encontrado.', 404);
  }

  return instrutor;
}
export async function loginInstrutor(email: string, senha: string) {
  const instrutor = await prisma.instrutor.findUnique({
    where: {
      email,
    },
  });

  const senhaConfere = await bcrypt.compare(
    senha,
    instrutor?.senha ?? ''
  );

  if (!instrutor || !senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    {
      id: instrutor.id,
      email: instrutor.email,
      tipo: 'INSTRUTOR',
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'],
    }
  );

  return {
    token,
    instrutor: {
      id: instrutor.id,
      nome: instrutor.nome,
      email: instrutor.email,
    },
  };
}
//Abre a página de instrutores caso ele faça seu login ou seja cadastrado como instrutor, também cadastra e registra os dados do instrutor para login.