import '../components/fileAndFolderList.js';
import '../components/fileEditor.js';
import '../components/breadcrumbPath.js';
import '../components/newForm.js';
import '../components/deleteForm.js';
import { defineView, assignPropsBySelector, createListen } from '../common/framework.js';
import { model } from '../common/model.js';

defineView('file-browser', self => {
  const el = self.shadowRoot;

  const {
    currentId,
    current,
    files,
    folders,
    selectedFile
  } = model.getViewState(self.appState);

  el.innerHTML = `
    <h1>Filer og mapper</h1>
    <breadcrumb-path></breadcrumb-path>
    <file-and-folder-list></file-and-folder-list>
    <file-editor></file-editor>
    <delete-form></delete-form>
    <new-form></new-form>
    <delete-dialog></delete-dialog>
  `;

  assignPropsBySelector(el, {
    'breadcrumb-path': { currentId, filesAndFolders: self.appState.filesAndFolders },
    'file-and-folder-list': { files, folders, currentId },
    'file-editor': { file: selectedFile },
    'new-folder-form': { currentId },
    'delete-form': { file: selectedFile },
    'new-form': { currentId },
    'delete-dialog': { current }
  });

  const listen = createListen(el);
  listen('file-and-folder-list', 'select', model.setCurrentId);
  listen('file-editor', 'save', model.saveFile);
  listen('file-editor', 'cancel', model.clearCurrentId);
  listen('delete-item', 'create-new', model.deleteItem);
  listen('new-form', 'create-new', model.createNew);
});
