import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

function deleteRecursive(id) {
  const children = model.filesAndFolders.filter(f => f.parentId === id);
  for (const child of children) deleteRecursive(child.id);
  model.filesAndFolders = model.filesAndFolders.filter(f => f.id !== id);
}

defineComponent('delete-dialog', (el, props, state, emit) => {
  const current = model.filesAndFolders.find(f => f.id === model.app.currentId);
  if (!current) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `
    <button id="delete">Slett ${current.name}</button>
  `;
  el.querySelector('#delete').onclick = () => {
    if (confirm(`Slette ${current.name}?`)) {
      deleteRecursive(current.id);
      model.app.currentId = null;
      document.querySelector('file-browser')._queueRender();
    }
  };
});