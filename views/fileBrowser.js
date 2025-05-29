import '../components/fileAndFolderList.js';
import '../components/fileEditor.js';
import '../components/breadcrumbPath.js';
import '../components/newFileForm.js';
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
    <new-file-form></new-file-form>
    <delete-dialog></delete-dialog>
  `;

  assignPropsBySelector(el, {
    'breadcrumb-path': { currentId },
    'file-and-folder-list': { files, folders, currentId },
    'file-editor': { file: selectedFile },
    'new-folder-form': { currentId },
    'new-file-form': { currentId },
    'delete-dialog': { current }
  });

  const listen = createListen(el);
  listen('file-and-filder-list', 'select', model.setCurrentId);
  listen('file-editor', 'save', model.saveFile);
  listen('file-editor', 'cancel', model.clearCurrentId);
  listen('new-folder-form', 'create-folder', model.createFolder);
  listen('new-file-form', 'create-file', model.createFile);
  listen('delete-dialog', 'delete', model.deleteItem);
});
