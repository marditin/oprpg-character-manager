const form = document.querySelector('#equipment-form');
const list = document.querySelector('#equipment-list');
const select = document.querySelector('#equipment-character');

let characterNames = {};

function createItem(equipment, onRemove) {
  const li = document.createElement('li');

  li.className =
    'list-group-item d-flex justify-content-between align-items-center';

  const owner =
    characterNames[equipment.characterId] ||
    `Personagem #${equipment.characterId}`;

  const info = document.createElement('span');

  info.textContent =
    `${equipment.name} (${equipment.category}) - ${owner}`;

  const button = document.createElement('button');

  button.className = 'btn btn-sm btn-danger';
  button.textContent = 'Remover';

  button.addEventListener('click', () => {
    onRemove(equipment.id);
  });

  li.append(info, button);

  return li;
}

export const equipmentView = {
  populateCharacterSelect(characters) {
    characterNames = {};

    select.innerHTML =
      '<option value="">Selecione um personagem...</option>';

    characters.forEach(character => {
      characterNames[character.id] = character.name;

      const option = document.createElement('option');

      option.value = character.id;
      option.textContent = character.name;

      select.appendChild(option);
    });
  },

  renderList(equipments, onRemove) {
    list.innerHTML = '';

    if (equipments.length === 0) {
      list.innerHTML =
        '<li class="list-group-item text-muted">Nenhum equipamento cadastrado.</li>';
      return;
    }

    equipments.forEach(equipment => {
      list.appendChild(createItem(equipment, onRemove));
    });
  },

  clearForm() {
    form.reset();
  },

  onSubmit(callback) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      callback({
        name: document.querySelector('#equipment-name').value,
        category: document.querySelector('#equipment-category').value,
        description: document.querySelector('#equipment-description').value,
        characterId: select.value,
      });
    });
  },
};