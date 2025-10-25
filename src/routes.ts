import { Router } from 'express';
import {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} from './controllers/cardsController';
import { getTarotReading } from './controllers/readingsController';

const router = Router();

// Rotas CRUD para Cartas de Tarot
router.get('/cards', getAllCards);
router.get('/cards/:id', getCardById);
router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

// Endpoint de Leitura de Tarot
router.get('/read', getTarotReading);

export default router;

