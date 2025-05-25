import { defineComponent } from '../common/defineComponent.js';

defineComponent('new-folder-form', self => {
  const el = self.shadowRoot;
  const currentId = self.props.currentId;

  el.innerHTML = `
    <fieldset>
      <legend>Ny mappe</legend>
      <input id="folderName" placeholder="Skriv inn mappenavn">
      <button id="add">Legg til ny mappe</button>
    </fieldset>
  `;
  el.querySelector('#add').onclick = () => {
    const name = el.querySelector('#folderName').value.trim();
    if (name) self.emit('create-folder', { name, parentId: currentId });
  };
}, ['currentId']);