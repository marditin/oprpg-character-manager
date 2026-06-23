import { db } from '../db.js';

function toApi(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    characterId: row.character_id,
  };
}

export const equipmentModel = {
  list() {
    return db.prepare('SELECT * FROM equipments').all().map(toApi);
  },

  listByCharacter(characterId) {
    return db
      .prepare('SELECT * FROM equipments WHERE character_id = ?')
      .all(Number(characterId))
      .map(toApi);
  },

  findById(id) {
    return toApi(
      db.prepare('SELECT * FROM equipments WHERE id = ?').get(Number(id))
    );
  },

  create({ name, category, description, characterId }) {
    const result = db
      .prepare(
        `INSERT INTO equipments (name, category, description, character_id)
         VALUES (?, ?, ?, ?)`
      )
      .run(name, category, description || '', Number(characterId));

    return this.findById(result.lastInsertRowid);
  },

  update(id, data) {
    const current = this.findById(id);
    if (!current) return null;

    const updated = {
      ...current,
      ...data,
      id: Number(id),
    };

    db.prepare(
      `UPDATE equipments
       SET name = ?, category = ?, description = ?, character_id = ?
       WHERE id = ?`
    ).run(
      updated.name,
      updated.category,
      updated.description || '',
      Number(updated.characterId),
      Number(id)
    );

    return this.findById(id);
  },

  remove(id) {
    const result = db
      .prepare('DELETE FROM equipments WHERE id = ?')
      .run(Number(id));

    return result.changes > 0;
  },

  removeByCharacter(characterId) {
    db.prepare('DELETE FROM equipments WHERE character_id = ?').run(
      Number(characterId)
    );
  },
};