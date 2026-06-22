import { characterService } from './services/characterService.js';
import { equipmentService } from './services/equipmentService.js';
import { characterView } from './ui/characterView.js';
import { equipmentView } from './ui/equipmentView.js';

const alertBox = document.querySelector('#alert');

function showError(message) {
  alertBox.textContent = message;
  alertBox.classList.remove('d-none');
}

function clearError() {
  alertBox.textContent = '';
  alertBox.classList.add('d-none');
}

async function updateCharacters() {
  const characters = await characterService.list();

  characterView.renderList(characters, removeCharacter);
  equipmentView.populateCharacterSelect(characters);
}

async function createCharacter(data) {
  clearError();

  try {
    await characterService.create(data);
    characterView.clearForm();
    await updateCharacters();
  } catch (error) {
    showError(error.message);
  }
}

async function removeCharacter(id) {
  clearError();

  try {
    await characterService.remove(id);
    await updateCharacters();
    await updateEquipments();
  } catch (error) {
    showError(error.message);
  }
}

async function updateEquipments() {
  const equipments = await equipmentService.list();

  equipmentView.renderList(equipments, removeEquipment);
}

async function createEquipment(data) {
  clearError();

  try {
    await equipmentService.create(data);
    equipmentView.clearForm();
    await updateEquipments();
  } catch (error) {
    showError(error.message);
  }
}

async function removeEquipment(id) {
  clearError();

  try {
    await equipmentService.remove(id);
    await updateEquipments();
  } catch (error) {
    showError(error.message);
  }
}

characterView.onSubmit(createCharacter);
equipmentView.onSubmit(createEquipment);

async function start() {
  try {
    await updateCharacters();
    await updateEquipments();
  } catch (error) {
    showError(
      'Não foi possível conectar com a API. Verifique se o backend está rodando em http://localhost:3000.'
    );
  }
}

start();