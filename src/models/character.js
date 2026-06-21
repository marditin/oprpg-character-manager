let characters = [];
let nextId = 1;

export const characterModel = {
  list() {
    return characters;
  },

  findById(id) {
    return characters.find(character => character.id === id) || null;
  },

  create({ name, nex, origin, characterClass }) {
    const character = {
      id: nextId++,
      name,
      nex,
      origin,
      characterClass,
    };

    characters.push(character);
    return character;
  },

  update(id, data) {
    const index = characters.findIndex(character => character.id === id);

    if (index === -1) return null;

    characters[index] = {
      ...characters[index],
      ...data,
      id,
    };

    return characters[index];
  },

  remove(id) {
    const lengthBefore = characters.length;
    characters = characters.filter(character => character.id !== id);

    return characters.length < lengthBefore;
  },
};