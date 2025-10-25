import { TarotCard, ITarotCard } from '../models';

// Service responsável por operações de banco para CRUD de cartas
export const findAllCards = async () => {
  return await TarotCard.find();
};

export const findCardById = async (id: string) => {
  return await TarotCard.findById(id);
};

export const createCardService = async (cardData: Partial<ITarotCard> | any) => {
  const newCard: ITarotCard = new TarotCard(cardData);
  await newCard.save();
  return newCard;
};

export const updateCardService = async (id: string, update: Partial<ITarotCard> | any) => {
  return await TarotCard.findByIdAndUpdate(id, update, { new: true, runValidators: true });
};

export const deleteCardService = async (id: string) => {
  return await TarotCard.findByIdAndDelete(id);
};
