import { db } from '../db.js';

function toApi(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    nex: row.nex,
    origin: row.origin,
    characterClass: row.character_class,
  };
}

export const characterModel = {
  list() {
    return db.prepare('SELECT * FROM characters').all().map(toApi);
  },

  findById(id) {
    return toApi(
      db.prepare('SELECT * FROM characters WHERE id = ?').get(Number(id))
    );
  },

  create({ name, nex, origin, characterClass }) {
    const result = db
      .prepare(
        `INSERT INTO characters (name, nex, origin, character_class)
         VALUES (?, ?, ?, ?)`
      )
      .run(name, Number(nex), origin, characterClass);

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
      `UPDATE characters
       SET name = ?, nex = ?, origin = ?, character_class = ?
       WHERE id = ?`
    ).run(
      updated.name,
      Number(updated.nex),
      updated.origin,
      updated.characterClass,
      Number(id)
    );

    return this.findById(id);
  },

  remove(id) {
    const result = db
      .prepare('DELETE FROM characters WHERE id = ?')
      .run(Number(id));

    return result.changes > 0;
  },
};