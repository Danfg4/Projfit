import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarMatriculaInput {
  clienteId: number;
  planoId: number;
  dataInicio: Date;
  status: string;
}

export async function criarMatricula(dados: CriarMatriculaInput) {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: dados.clienteId,
    },
  });

  if (!cliente) {
    throw new AppError('Aluno não encontrado.', 404);
  }

  const plano = await prisma.plano.findUnique({
    where: {
      id: dados.planoId,
    },
  });

  if (!plano) {
    throw new AppError('Plano não encontrado.', 404);
  }

  return prisma.matricula.create({
  data: dados,
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
    plano: true,
  },
});
}

export async function listarMatriculas() {
  return prisma.matricula.findMany({
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
  plano: true,
},
    orderBy: {
      id: 'asc',
    },
  });
}

export async function buscarMatriculaPorId(id: number) {
  const matricula = await prisma.matricula.findUnique({
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
  plano: true,
},
  });

  if (!matricula) {
    throw new AppError('Matrícula não encontrada.', 404);
  }

  return matricula;
}

export async function atualizarMatricula(
  id: number,
  dados: Partial<CriarMatriculaInput>
) {
  const matricula = await prisma.matricula.findUnique({
    where: {
      id,
    },
  });

  if (!matricula) {
    throw new AppError('Matrícula não encontrada.', 404);
  }

  return prisma.matricula.update({
    where: {
      id,
    },
    data: dados,
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
  plano: true,
},
  });
}
//Efetua a criação da matrícula do cliente para que ele se torne aluno, caso ele já possua uma, a interface pede para que ele informe sua matrícula, seja para login ou para outra função.