import { Schema, model, Document } from 'mongoose';

// Interface para o documento Carta
export interface ITarotCard extends Document {
  name: string;
  suit: string; // Naipe (ex: Arcanos Maiores, Copas, Espadas, Ouros, Bastões)
  meaning_upright: string; // Significado quando a carta está na posição normal
  meaning_reversed: string; // Significado quando a carta está invertida
  keywords: string[]; // Palavras-chave para a interpretação
  number: number; // Número da carta (0 a 21 para Arcanos Maiores, 1 a 10 + 4 para Arcanos Menores)
  arcana: 'Major' | 'Minor'; // Tipo de arcano
}

// Schema do Mongoose para a Carta de Tarot
const TarotCardSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  suit: { type: String, required: true },
  meaning_upright: { type: String, required: true },
  meaning_reversed: { type: String, required: true },
  keywords: { type: [String], required: true },
  number: { type: Number, required: true },
  arcana: { type: String, enum: ['Major', 'Minor'], required: true },
});

// Criar o modelo
export const TarotCard = model<ITarotCard>('TarotCard', TarotCardSchema);

