import { characterModel } from '../models/character.js';

export const characterService = {
  list() {
    return characterModel.list();
  },

  findById(id) {
    const character = characterModel.findById(id);

    if (!character) {
      const error = new Error('Character not found');
      error.status = 404;
      throw error;
    }

    return character;
  },

  create(data) {
    if (!data.name || data.nex === undefined || !data.origin || !data.characterClass) {
      const error = new Error('name, nex, origin and characterClass are required');
      error.status = 400;
      throw error;
    }

    return characterModel.create(data);
  },

  update(id, data) {
    const character = characterModel.update(id, data);

    if (!character) {
      const error = new Error('Character not found');
      error.status = 404;
      throw error;
    }

    return character;
  },

  remove(id) {
    const removed = characterModel.remove(id);

    if (!removed) {
      const error = new Error('Character not found');
      error.status = 404;
      throw error;
    }
  },
};