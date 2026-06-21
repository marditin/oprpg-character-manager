import { equipmentModel } from '../models/equipment.js';
import { characterModel } from '../models/character.js';

export const equipmentService = {
  list(characterId) {
    if (characterId) {
      return equipmentModel.listByCharacter(Number(characterId));
    }

    return equipmentModel.list();
  },

  findById(id) {
    const equipment = equipmentModel.findById(id);

    if (!equipment) {
      const error = new Error('Equipment not found');
      error.status = 404;
      throw error;
    }

    return equipment;
  },

  create(data) {
    if (!data.name || !data.category || !data.characterId) {
      const error = new Error('name, category and characterId are required');
      error.status = 400;
      throw error;
    }

    const character = characterModel.findById(Number(data.characterId));

    if (!character) {
      const error = new Error('Character does not exist');
      error.status = 422;
      throw error;
    }

    return equipmentModel.create(data);
  },

  update(id, data) {
    const equipment = equipmentModel.update(id, data);

    if (!equipment) {
      const error = new Error('Equipment not found');
      error.status = 404;
      throw error;
    }

    return equipment;
  },

  remove(id) {
    const removed = equipmentModel.remove(id);

    if (!removed) {
      const error = new Error('Equipment not found');
      error.status = 404;
      throw error;
    }
  },
};