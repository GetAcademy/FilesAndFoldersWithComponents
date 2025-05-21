import { defineComponent } from '../common/defineComponent.js';
import { model } from '../model.js';

defineComponent('new-folder-form', (el, props, state, emit) => {
  const current = model.filesAndFolders.find(f => f.id === model.app.currentId);
  if (current?.content) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `
    <input id="folderName" placeholder="Skriv inn mappenavn">
    <button id="add">Legg til ny mappe</button>
  `;
  el.querySelector('#add').onclick = () => {
    const name = el.querySelector('#folderName').value.trim();
    if (!name) return;
    const newId = Math.max(...model.filesAndFolders.map(f => f.id)) + 1;
    model.filesAndFolders.push({ id: newId, name, parentId: model.app.currentId });
    document.querySelector('file-browser')._queueRender();
  };
});