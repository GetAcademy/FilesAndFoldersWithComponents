import { defineComponent } from '../common/framework.js';

defineComponent('new-form', ['currentId'], false, self => {
  const el = self.shadowRoot;
  const currentId = self.props.currentId;

  el.innerHTML = `
    <fieldset>
      <legend>Ny mappe eller fil</legend>
      <input placeholder="Skriv inn navn">
      <button>Ny mappe</button>
      <button>Ny fil</button>
    </fieldset>
  `;
  const btns = el.querySelectorAll('button');  
  const emit = isFolder => () => {
    const name = el.querySelector('input').value.trim();
    if (name) self.emit('create-new', { name, parentId: currentId, isFolder });
  };
  btns[0].addEventListener('click', emit(true));
  btns[1].addEventListener('click', emit(false));
});