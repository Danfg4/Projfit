import 'dotenv/config'

import { app } from './app'
const PORT =  process.env.PORT ? Number(process.env.PORT) : 3333
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//O essencial para o manimento do servidor e da porta dele.