import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

defineComponent('new-file-form', (el, props, state, emit) => {
  const current = model.filesAndFolders.find(f => f.id === model.app.currentId);
  if (current?.content) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `
    <input id="fileName" placeholder="Skriv inn filnavn">
    <button id="add">Legg til ny fil</button>
  `;
  el.querySelector('#add').onclick = () => {
    const name = el.querySelector('#fileName').value.trim();
    if (!name) return;
    const newId = Math.max(...model.filesAndFolders.map(f => f.id)) + 1;
    model.filesAndFolders.push({ id: newId, name, parentId: model.app.currentId, content: '' });
    document.querySelector('file-browser')._queueRender();
  };
});
