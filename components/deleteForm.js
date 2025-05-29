import { defineComponent } from '../common/framework.js';

defineComponent('delete-form', ['file'], false, self => {
  const el = self.shadowRoot;
  let file = self.props.file;
  if (!file) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <fieldset>
      <legend>Slette</legend>
      <button>Slett ${file.name}</button>
    </fieldset>
  `;

  el.querySelector('button').onclick = () => self.emit('delete-item', { id: current.id });
});