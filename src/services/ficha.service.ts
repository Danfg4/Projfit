import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface ExercicioFichaInput {
  exercicioId: number;
  series: number;
  repeticoes: number;
  descansoSegundos: number;
}

interface CriarFichaInput {
  clienteId: number;
  instrutorId: number;
  objetivo: string;
  dataElaboracao: Date;
  exercicios: ExercicioFichaInput[];
}

export async function criarFicha(dados: CriarFichaInput) {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: dados.clienteId,
    },
  });

  if (!cliente) {
    throw new AppError('Aluno não encontrado.', 404);
  }

  const instrutor = await prisma.instrutor.findUnique({
    where: {
      id: dados.instrutorId,
    },
  });

  if (!instrutor) {
    throw new AppError('Instrutor não encontrado.', 404);
  }

  const matriculaAtiva = await prisma.matricula.findFirst({
    where: {
      clienteId: dados.clienteId,
      status: 'ATIVA',
    },
  });

  if (!matriculaAtiva) {
    throw new AppError(
      'O aluno não possui matrícula ativa.',
      400
    );
  }

  for (const exercicio of dados.exercicios) {
    const exercicioExiste = await prisma.exercicio.findUnique({
      where: {
        id: exercicio.exercicioId,
      },
    });

    if (!exercicioExiste) {
      throw new AppError(
        `Exercício ${exercicio.exercicioId} não encontrado.`,
        404
      );
    }
  }

  return prisma.fichaTreino.create({
    data: {
      clienteId: dados.clienteId,
      instrutorId: dados.instrutorId,
      objetivo: dados.objetivo,
      dataElaboracao: dados.dataElaboracao,
      exercicios: {
        create: dados.exercicios.map((exercicio) => ({
          exercicioId: exercicio.exercicioId,
          series: exercicio.series,
          repeticoes: exercicio.repeticoes,
          descansoSegundos: exercicio.descansoSegundos,
        })),
      },
    },
    include: {
      cliente: {
        select: {
          id: true,
          nome: true,
          cpf: true,
          email: true,
          telefone: true,
          criadoEm: true,
        },
      },
      instrutor: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      exercicios: {
        include: {
          exercicio: true,
        },
      },
    },
  });
}

export async function listarFichas() {
  return prisma.fichaTreino.findMany({
    include: {
      cliente: {
        select: {
          id: true,
          nome: true,
          cpf: true,
          email: true,
          telefone: true,
          criadoEm: true,
        },
      },
      instrutor: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      exercicios: {
        include: {
          exercicio: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export async function buscarFichaPorId(id: number) {
  const ficha = await prisma.fichaTreino.findUnique({
    where: {
      id,
    },
    include: {
      cliente: {
        select: {
          id: true,
          nome: true,
          cpf: true,
          email: true,
          telefone: true,
          criadoEm: true,
        },
      },
      instrutor: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      exercicios: {
        include: {
          exercicio: true,
        },
      },
    },
  });

  if (!ficha) {
    throw new AppError('Ficha de treino não encontrada.', 404);
  }

  return ficha;
}
//Cria ficha, acessa elas, identifica,  direciona ao código do erro em específico caso haja um erro, através do import apperror.