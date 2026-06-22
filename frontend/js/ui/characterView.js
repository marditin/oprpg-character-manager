const form = document.querySelector('#character-form');
const list = document.querySelector('#character-list');

function createItem(character, onRemove) {
  const li = document.createElement('li');

  li.className =
    'list-group-item d-flex justify-content-between align-items-center';

  const info = document.createElement('span');

  info.textContent =
    `${character.name} | NEX ${character.nex}% | ${character.origin} | ${character.characterClass}`;

  const button = document.createElement('button');

  button.className = 'btn btn-sm btn-danger';
  button.textContent = 'Remover';

  button.addEventListener('click', () => {
    onRemove(character.id);
  });

  li.append(info, button);

  return li;
}

export const characterView = {
  renderList(characters, onRemove) {
    list.innerHTML = '';

    if (characters.length === 0) {
      list.innerHTML =
        '<li class="list-group-item text-muted">Nenhum personagem cadastrado.</li>';
      return;
    }

    characters.forEach(character => {
      list.appendChild(createItem(character, onRemove));
    });
  },

  clearForm() {
    form.reset();
  },

  onSubmit(callback) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      callback({
        name: document.querySelector('#character-name').value,
        nex: document.querySelector('#character-nex').value,
        origin: document.querySelector('#character-origin').value,
        characterClass: document.querySelector('#character-class').value,
      });
    });
  },
};