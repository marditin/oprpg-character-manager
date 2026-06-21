let equipments = [];
let nextId = 1;

export const equipmentModel = {
  list() {
    return equipments;
  },

  listByCharacter(characterId) {
    return equipments.filter(equipment => equipment.characterId === characterId);
  },

  findById(id) {
    return equipments.find(equipment => equipment.id === id) || null;
  },

  create({ name, category, description, characterId }) {
    const equipment = {
      id: nextId++,
      name,
      category,
      description,
      characterId: Number(characterId),
    };

    equipments.push(equipment);
    return equipment;
  },

  update(id, data) {
    const index = equipments.findIndex(equipment => equipment.id === id);

    if (index === -1) return null;

    equipments[index] = {
      ...equipments[index],
      ...data,
      id,
    };

    return equipments[index];
  },

  remove(id) {
    const lengthBefore = equipments.length;
    equipments = equipments.filter(equipment => equipment.id !== id);

    return equipments.length < lengthBefore;
  },
};