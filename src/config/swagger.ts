import swaggerJSDoc from 'swagger-jsdoc';

// Este arquivo monta o DOCUMENTO OpenAPI da API inteira.
// A configuração global fica aqui.
// A documentação de cada endpoint ficará nos arquivos
// src/routes/*.ts usando comentários @openapi.

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'FitMaster API',
      version: '1.0.0',
      description:
        'API RESTful do sistema FitMaster para gerenciamento de alunos, ' +
        'planos, matrículas, instrutores, exercícios e fichas de treino. ' +
        'Faça login para obter um token JWT e use o botão Authorize ' +
        'para testar as rotas protegidas.',
    },

    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Ambiente de desenvolvimento',
      },
    ],

    tags: [
      {
        name: 'Autenticação',
        description: 'Login de clientes e instrutores',
      },
      {
        name: 'Clientes',
        description: 'Cadastro e consulta de clientes',
      },
      {
        name: 'Planos',
        description: 'Cadastro e consulta de planos',
      },
      {
        name: 'Matrículas',
        description: 'Cadastro, consulta e atualização de matrículas',
      },
      {
        name: 'Instrutores',
        description: 'Cadastro, consulta e autenticação de instrutores',
      },
      {
        name: 'Exercícios',
        description: 'Cadastro e consulta de exercícios',
      },
      {
        name: 'Fichas de treino',
        description: 'Criação e consulta de fichas de treino',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Cole aqui o token JWT obtido em um endpoint de login, sem o prefixo "Bearer".',
        },
      },

      schemas: {
        RespostaErro: {
          type: 'object',
          properties: {
            erro: {
              type: 'string',
              example: 'Mensagem explicando o que deu errado.',
            },
          },
        },

        Cliente: {
          type: 'object',
          description:
            'Dados públicos do cliente. A senha nunca é retornada pela API.',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Cliente Teste',
            },
            cpf: {
              type: 'string',
              example: '12345678901',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'cliente@teste.com',
            },
            telefone: {
              type: 'string',
              example: '24999999999',
            },
            dataNascimento: {
              type: 'string',
              format: 'date-time',
              example: '2000-01-01T00:00:00.000Z',
            },
            criadoEm: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-02T13:52:48.283Z',
            },
          },
        },

        Plano: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Mensal',
            },
            valorMensal: {
              type: 'number',
              format: 'float',
              example: 99.9,
            },
            duracaoMeses: {
              type: 'integer',
              example: 1,
            },
          },
        },

        Matricula: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            clienteId: {
              type: 'integer',
              example: 1,
            },
            planoId: {
              type: 'integer',
              example: 1,
            },
            dataInicio: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-03T00:00:00.000Z',
            },
            status: {
              type: 'string',
              enum: ['ATIVA', 'TRANCADA', 'CANCELADA'],
              example: 'ATIVA',
            },
            cliente: {
              $ref: '#/components/schemas/Cliente',
            },
            plano: {
              $ref: '#/components/schemas/Plano',
            },
          },
        },

        Instrutor: {
          type: 'object',
          description:
            'Dados públicos do instrutor. A senha nunca é retornada pela API.',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Carlos Souza',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'carlos@fitmaster.com',
            },
          },
        },

        Exercicio: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Supino reto',
            },
          },
        },

        FichaExercicio: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            fichaTreinoId: {
              type: 'integer',
              example: 1,
            },
            exercicioId: {
              type: 'integer',
              example: 1,
            },
            series: {
              type: 'integer',
              example: 4,
            },
            repeticoes: {
              type: 'integer',
              example: 10,
            },
            descansoSegundos: {
              type: 'integer',
              example: 60,
            },
            exercicio: {
              $ref: '#/components/schemas/Exercicio',
            },
          },
        },

        FichaTreino: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            clienteId: {
              type: 'integer',
              example: 1,
            },
            instrutorId: {
              type: 'integer',
              example: 1,
            },
            objetivo: {
              type: 'string',
              example: 'Hipertrofia',
            },
            dataElaboracao: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-04T00:00:00.000Z',
            },
            cliente: {
              $ref: '#/components/schemas/Cliente',
            },
            instrutor: {
              $ref: '#/components/schemas/Instrutor',
            },
            exercicios: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/FichaExercicio',
              },
            },
          },
        },

        LoginCliente: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'cliente@teste.com',
            },
            senha: {
              type: 'string',
              example: '123456',
            },
          },
        },

        LoginInstrutor: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'carlos@fitmaster.com',
            },
            senha: {
              type: 'string',
              example: '123456',
            },
          },
        },

        RespostaLoginCliente: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIs...',
            },
            cliente: {
              $ref: '#/components/schemas/Cliente',
            },
          },
        },

        RespostaLoginInstrutor: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIs...',
            },
            instrutor: {
              $ref: '#/components/schemas/Instrutor',
            },
          },
        },
      },
    },
  },

  apis: [
    './src/routes/*.ts',
    './dist/routes/*.js',
  ],
});