import { equipmentService } from '../services/equipmentService.js';

export const equipmentController = {
  list(req, res) {
    const equipments = equipmentService.list(req.query.characterId);
    res.json(equipments);
  },

  findById(req, res) {
    const equipment = equipmentService.findById(Number(req.params.id));
    res.json(equipment);
  },

  create(req, res) {
    const equipment = equipmentService.create(req.body);
    res.status(201).json(equipment);
  },

  update(req, res) {
    const equipment = equipmentService.update(Number(req.params.id), req.body);
    res.json(equipment);
  },

  remove(req, res) {
    equipmentService.remove(Number(req.params.id));
    res.status(204).end();
  },
};