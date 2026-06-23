import { characterService } from '../services/characterService.js';

export const characterController = {
  list(req, res) {
    const characters = characterService.list();
    res.json(characters);
  },

  findById(req, res) {
    const character = characterService.findById(Number(req.params.id));
    res.json(character);
  },

  create(req, res) {
    const character = characterService.create(req.body);
    res.status(201).json(character);
  },

  update(req, res) {
    const character = characterService.update(Number(req.params.id), req.body);
    res.json(character);
  },

  remove(req, res) {
    characterService.remove(Number(req.params.id));
    res.status(204).end();
  },
};