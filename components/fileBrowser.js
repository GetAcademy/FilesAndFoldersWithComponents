import { defineComponent } from '../common/defineComponent.js';
import { model } from '../model.js';

defineComponent('file-browser', (el, props, state, emit) => {
  const currentId = model.app.currentId;
  const currentFile = model.filesAndFolders.find(f => f.id === currentId);
  const currentFolder = currentFile?.hasOwnProperty('content') ? model.filesAndFolders.find(f => f.id === currentFile.parentId) : currentFile;

  const folders = model.filesAndFolders.filter(f => !f.hasOwnProperty('content') && f.parentId === currentFolder?.id);
  const files = model.filesAndFolders.filter(f => f.hasOwnProperty('content') && f.parentId === currentFolder?.id);

  el.innerHTML = /*HTML*/`
    <h1>Filer og mapper</h1>
    <breadcrumb-path current-id="${currentId ?? ''}"></breadcrumb-path>
    <folder-list></folder-list>
    <file-list></file-list>
    <file-editor></file-editor>
    <new-folder-form></new-folder-form>
    <new-file-form></new-file-form>
    <delete-dialog></delete-dialog>
  `;
});
