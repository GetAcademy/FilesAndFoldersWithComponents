import { defineComponent } from '../common/framework.js';

defineComponent('new-file-form', self => {
  const el = self.shadowRoot;
  const currentId = self.props.currentId;

  el.innerHTML = `
    <fieldset>
      <legend>Ny fil</legend>
      <input id="fileName" placeholder="Skriv inn filnavn">
      <button id="add">Legg til ny fil</button>
    </fieldset>
  `;
  el.querySelector('#add').onclick = () => {
    const name = el.querySelector('#fileName').value.trim();
    if (name) self.emit('create-file', { name, parentId: currentId });
  };
}, ['currentId']);