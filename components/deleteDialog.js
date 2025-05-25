import { defineComponent } from '../common/defineComponent.js';

defineComponent('delete-dialog', self => {
  const el = self.shadowRoot;
  let current = self.props.current;
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
  el.querySelector('#delete').onclick = () => self.emit('delete', { id: current.id });
}, ['current']);