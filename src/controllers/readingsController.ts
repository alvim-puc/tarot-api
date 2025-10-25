import { Request, Response } from 'express';
import { getThreeCardReadingService } from '../services/readingsService';

// GET /read - Get a 3-card reading
export const getTarotReading = async (req: Request, res: Response) => {
  try {
    const result = await getThreeCardReadingService();
    res.status(200).json({
      message: 'Sua leitura de Tarot de 3 cartas:',
      reading: result,
    });
  } catch (error: Error | any) {
    if (error.message === 'NOT_ENOUGH_CARDS') {
      return res.status(422).json({ message: 'Não há cartas suficientes no baralho para uma leitura (mínimo 3).' });
    }
    res.status(500).json({ message: 'Erro ao realizar a leitura de Tarot', error });
  }
};
