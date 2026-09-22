import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; //Importa as informações criptografadas como por exemplo a senha do usuário.

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash("123456", 10);

  await prisma.cliente.upsert({
  where: {
    email: "cliente@teste.com",
  },
  update: {
    dataNascimento: new Date("2000-01-01"),
  },
  create: {
    nome: "Cliente Teste",
    cpf: "12345678901",
    email: "cliente@teste.com",
    senha,
    telefone: "24999999999",
    dataNascimento: new Date("2000-01-01"),
  },
});
  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
//Esse trecho do catch é uma função definida pra quando for encontrado um erro, como por exeplo aí informa o erro e fecha a página ou sai.





//Essa página é  feita para  registrar no banco de dados os dados únicos criados, registra os clientes.