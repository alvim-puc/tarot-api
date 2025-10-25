import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tarotdb';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conexão com MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    // Em um ambiente real, você pode querer sair do processo
    // process.exit(1);
  }
};

