import { api } from '../api.js';

export const equipmentService = {
  list() {
    return api.getEquipments();
  },

  async create({ name, category, description, characterId }) {
    if (!name || !name.trim()) {
      throw new Error('Nome do equipamento é obrigatório');
    }

    if (!category || !category.trim()) {
      throw new Error('Categoria é obrigatória');
    }

    if (!characterId) {
      throw new Error('Selecione um personagem');
    }

    return api.createEquipment({
      name: name.trim(),
      category: category.trim(),
      description: description?.trim() || '',
      characterId: Number(characterId),
    });
  },

  async update(id, data) {
    return api.updateEquipment(id, data);
  },

  remove(id) {
    return api.removeEquipment(id);
  },
};