import { defineComponent } from '../common/defineComponent.js';

defineComponent('new-file-form', (el, props, state, emit) => {
  const currentId = props.currentId;

  el.innerHTML = `
    <fieldset>
      <legend>Ny fil</legend>
      <input id="fileName" placeholder="Skriv inn filnavn">
      <button id="add">Legg til ny fil</button>
    </fieldset>
  `;
  el.querySelector('#add').onclick = () => {
    const name = el.querySelector('#fileName').value.trim();
    if (name) emit('create-file', { name, parentId: currentId });
  };
}, ['currentId']);
