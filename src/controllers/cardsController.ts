import { Request, Response } from 'express';
import {
  findAllCards,
  findCardById,
  createCardService,
  updateCardService,
  deleteCardService,
} from '../services/cardsService';

/* GET /cards - List all cards */
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await findAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cartas', error });
  }
};

// GET /cards/:id - Get a single card by ID
export const getCardById = async (req: Request, res: Response) => {
  try {
    const card = await findCardById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carta', error });
  }
};

// POST /cards - Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await createCardService(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    // 11000 é o código de erro para chave duplicada no MongoDB (unique: true)
    const anyError = error as { code?: number; message?: string; [key: string]: any };
    if (anyError.code === 11000) {
      return res.status(409).json({ message: 'Carta com este nome já existe.' });
    }
    res.status(400).json({ message: 'Dados inválidos para criar carta', error: anyError });
  }
};

// PUT /cards/:id - Update an existing card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await updateCardService(req.params.id, req.body);
    if (!updatedCard) {
      return res.status(404).json({ message: 'Carta não encontrada para atualização' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar carta', error });
  }
};

// DELETE /cards/:id - Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const deletedCard = await deleteCardService(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Carta não encontrada para exclusão' });
    }
    res.status(204).send(); // 204 No Content para exclusão bem-sucedida
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar carta', error });
  }
};
