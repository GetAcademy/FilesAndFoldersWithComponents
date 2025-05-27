import { defineComponent } from '../common/defineComponent.js';

defineComponent('file-editor', self => {
  const el = self.shadowRoot;
  let file = self.props.file;
  if (typeof file === 'string') {
    try {
      file = JSON.parse(file);
    } catch {
      file = null;
    }
  }

  if (!file) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <fieldset>
      <legend>Redigering</legend>
      <textarea id="editArea">${file.content}</textarea><br/>
      <button id="save">Lagre</button>
      <button id="cancel">Avbryt</button>
      <br/>
      <button id="delete">Slett ${file.name}</button>
    </fieldset>
  `;

  el.querySelector('#save').onclick = () => {
    self.emit('save', { id: file.id, content: el.querySelector('#editArea').value });
  };
  el.querySelector('#cancel').onclick = () => self.emit('cancel');
}, ['file']);