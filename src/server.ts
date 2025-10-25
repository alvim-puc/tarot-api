import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());

// Conexão com o Banco de Dados
connectDB();

// Rotas da API
app.use('/api/v1', routes);

// Rota de saúde simples
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Tarot API está online!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

