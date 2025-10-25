import { TarotCard } from '../models';

export const getThreeCardReadingService = async () => {
  // 1. Contar cartas
  const count = await TarotCard.countDocuments();
  if (count < 3) {
    // Lançar um erro específico para o controller decidir o status HTTP
    throw new Error('NOT_ENOUGH_CARDS');
  }

  // 2. Selecionar 3 cartas aleatórias com aggregation
  const reading: any[] = await TarotCard.aggregate([
    { $sample: { size: 3 } }
  ]);

  // 3. Decidir posição (normal/invertida) e montar resultado
  const result = reading.map(card => {
    const isReversed = Math.random() < 0.5;
    return {
      _id: card._id,
      name: card.name,
      suit: card.suit,
      number: card.number,
      arcana: card.arcana,
      position: isReversed ? 'Invertida' : 'Normal',
      meaning: isReversed ? card.meaning_reversed : card.meaning_upright,
      keywords: card.keywords,
    };
  });

  return result;
};
