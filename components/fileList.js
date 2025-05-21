import { defineComponent } from '../common/defineComponent.js';
import { model } from '../model.js';

defineComponent('file-list', (el, props, state, emit) => {
  const currentId = model.app.currentId;
  const currentFile = model.filesAndFolders.find(f => f.id === currentId);
  const currentFolder = currentFile?.content ? model.filesAndFolders.find(f => f.id === currentFile.parentId) : currentFile;
  const files = model.filesAndFolders.filter(f => f.content && f.parentId === currentFolder?.id);

  let html = '';
  for (const file of files) {
    html += `<span>🗎</span> <a href="#" data-id="${file.id}">${file.name}</a><br/>`;
  }
  el.innerHTML = html;
  el.querySelectorAll('a').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      model.app.currentId = +a.dataset.id;
      document.querySelector('file-browser')._queueRender();
    };
  });
});
