import { API_URL } from './config.js';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Error ${response.status}`;

    try {
      const body = await response.json();
      if (body && body.error) message = body.error;
    } catch (_) {}

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  getCharacters() {
    return request('/characters');
  },

  createCharacter(data) {
    return request('/characters', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  removeCharacter(id) {
    return request(`/characters/${id}`, {
      method: 'DELETE',
    });
  },

  getEquipments() {
    return request('/equipments');
  },

  createEquipment(data) {
    return request('/equipments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEquipment(id, data) {
    return request(`/equipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  removeEquipment(id) {
    return request(`/equipments/${id}`, {
      method: 'DELETE',
    });
  },
};