import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarExercicioInput {
  nome: string;
}

export async function criarExercicio(dados: CriarExercicioInput) {
  const exercicioExistente = await prisma.exercicio.findFirst({
    where: {
      nome: dados.nome,
    },
  });

  if (exercicioExistente) {
    throw new AppError('Já existe um exercício com esse nome.', 400);
  }

  return prisma.exercicio.create({
    data: dados,
  });
}

export async function listarExercicios() {
  return prisma.exercicio.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function buscarExercicioPorId(id: number) {
  const exercicio = await prisma.exercicio.findUnique({
    where: {
      id,
    },
  });

  if (!exercicio) {
    throw new AppError('Exercício não encontrado.', 404);
  }

  return exercicio;
}
//Abre uma aba pra criar um exercício, caso ele já exista é entregue um "erro" dizendo que ele já existe.