import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarPlanoInput {
  nome: string;
  valorMensal: number;
  duracaoMeses: number;
}

export async function criarPlano(dados: CriarPlanoInput) {
  const planoExistente = await prisma.plano.findFirst({
    where: {
      nome: dados.nome,
    },
  });

  if (planoExistente) {
    throw new AppError('Já existe um plano com esse nome.', 400);
  }

  return prisma.plano.create({
    data: dados,
  });
}

export async function listarPlanos() {
  return prisma.plano.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function buscarPlanoPorId(id: number) {
  const plano = await prisma.plano.findUnique({
    where: { id },
  });

  if (!plano) {
    throw new AppError('Plano não encontrado.', 404);
  }

  return plano;
}
//Cria a interface de planos a serem apresentados para o cliente.
