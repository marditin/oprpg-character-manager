import { api } from '../api.js';

export const characterService = {
  list() {
    return api.getCharacters();
  },

  async create({ name, nex, origin, characterClass }) {
    if (!name || !name.trim()) {
      throw new Error('Nome do personagem é obrigatório');
    }

    if (nex === '' || nex === null || isNaN(Number(nex))) {
      throw new Error('NEX deve ser um número');
    }

    if (!origin || !origin.trim()) {
      throw new Error('Origem é obrigatória');
    }

    if (!characterClass || !characterClass.trim()) {
      throw new Error('Classe é obrigatória');
    }

    return api.createCharacter({
      name: name.trim(),
      nex: Number(nex),
      origin: origin.trim(),
      characterClass: characterClass.trim(),
    });
  },

  remove(id) {
    return api.removeCharacter(id);
  },
};