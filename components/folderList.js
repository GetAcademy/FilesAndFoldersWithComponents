import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

defineComponent('folder-list', (el, props, state, emit) => {
  const currentId = model.app.currentId;
  const currentFolder = model.filesAndFolders.find(f => f.id === currentId && !f.content);
  const folders = model.filesAndFolders.filter(f => !f.content && f.parentId === (currentFolder?.id ?? null));
  console.log(currentId, currentFolder, folders);

  let html = '';
  if (currentFolder && currentFolder.parentId != null) {
    html += `📁 <a href="#" data-id="${currentFolder.parentId}">..</a><br/>`;
  }

  for (const folder of folders) {
    html += `📁 <a href="#" data-id="${folder.id}">${folder.name}</a><br/>`;
  }

  el.innerHTML = `<fieldset><legend>Mapper</legend>${html}</fieldset>`;
  el.querySelectorAll('a').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      model.app.currentId = +a.dataset.id;
      document.querySelector('file-browser')._queueRender();
    };
  });
});
