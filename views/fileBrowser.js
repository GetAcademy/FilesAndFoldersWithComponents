import '../components/deleteDialog.js';
import '../components/fileEditor.js';
import '../components/fileList.js';
import '../components/folderList.js';
import '../components/newFileForm.js';
import '../components/newFolderForm.js';
import { defineComponent } from '../common/defineComponent.js';
import { assignPropsBySelector } from '../common/assignPropsBySelector.js';
import { model } from '../model.js';

defineComponent('file-browser', (el, props, state, emit) => {
  const currentId = model.app.currentId;
  const current = model.filesAndFolders.find(f => f.id === currentId);
  const currentFolder = current?.content ? model.filesAndFolders.find(f => f.id === current.parentId) : current;
  const files = model.filesAndFolders.filter(f => f.content && f.parentId === currentFolder?.id);
  const folders = model.filesAndFolders.filter(f => !f.content && f.parentId === currentFolder?.id);
  const selectedFile = current?.content ? current : null;

  el.innerHTML = `
    <h1>Filer og mapper</h1>
    <breadcrumb-path></breadcrumb-path>
    <folder-list></folder-list>
    <file-list></file-list>
    <file-editor></file-editor>
    <new-folder-form></new-folder-form>
    <new-file-form></new-file-form>
    <delete-dialog></delete-dialog>
  `;

  assignPropsBySelector(el, {
    'breadcrumb-path': { currentId },
    'folder-list': { folders, currentId },
    'file-list': { files },
    'file-editor': { file: selectedFile }
  });
});