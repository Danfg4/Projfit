import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
log : ['query', 'warn', 'error']
})

//Cria, Importa e exporta o prisma client, permitindo o client ser reutilizado pra não ter necessidade de criar outros clients e não desorganizar o código.