import { defineComponent } from '../common/defineComponent.js';

defineComponent('delete-dialog', (el, props, state, emit) => {
  let current = props.current;
  if (typeof current === 'string') {
    try {
      current = JSON.parse(current);
    } catch {
      current = null;
    }
  }

  if (!current) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <fieldset>
      <legend>Slett</legend>
      <button id="delete">Slett ${current.name}</button>
    </fieldset>
  `;
  el.querySelector('#delete').onclick = () => emit('delete', { id: current.id });
}, ['current']);