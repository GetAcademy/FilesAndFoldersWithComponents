import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

defineComponent('file-editor', (el, props, state, emit) => {
  const currentId = model.app.currentId;
  const currentFile = model.filesAndFolders.find(f => f.id === currentId && f.content !== undefined);
  if (!currentFile) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = /*HTML*/`
    <fieldset>
      <legend>Redigering</legend>
      <textarea id="editArea">${currentFile.content}</textarea><br/>
      <button id="save">Lagre</button>
      <button id="cancel">Avbryt</button>
    </fieldset>
  `;
  el.querySelector('#save').onclick = () => {
    currentFile.content = el.querySelector('#editArea').value;
  };
  el.querySelector('#cancel').onclick = () => {
    document.querySelector('file-browser')._queueRender();
  };
});