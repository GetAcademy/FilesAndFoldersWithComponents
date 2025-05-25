import '../components/fileList.js';
import '../components/fileEditor.js';
import '../components/folderList.js';
import '../components/breadcrumbPath.js';
import '../components/newFolderForm.js';
import '../components/newFileForm.js';
import '../components/deleteDialog.js';
import { defineComponent } from '../common/defineComponent.js';
import { assignPropsBySelector } from '../common/assignPropsBySelector.js';
import { model } from '../model.js';

defineComponent('file-browser', self => {
  const el = self.shadowRoot;

  const listen = (selector, eventName, handler) => {
    el.addEventListener(eventName, e => {
      const target = e.target.closest(selector);
      if (target) handler(e.detail);
    });
  };

  listen('folder-list', 'select', model.setCurrentId);
  listen('file-list', 'select', model.setCurrentId);
  listen('file-editor', 'save', model.saveFile);
  listen('file-editor', 'cancel', model.clearCurrentId);
  listen('new-folder-form', 'create-folder', model.createFolder);
  listen('new-file-form', 'create-file', model.createFile);
  listen('delete-dialog', 'delete', model.deleteItem);

  const state = self.appState;
  const currentId = state.app.currentId;
  const current = state.filesAndFolders.find(f => f.id === currentId);
  const currentFolder = current?.content
    ? state.filesAndFolders.find(f => f.id === current.parentId)
    : current;
  const files = state.filesAndFolders.filter(f => f.content && f.parentId === currentFolder?.id);
  const folders = state.filesAndFolders.filter(f => !f.content && f.parentId === currentFolder?.id);
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
    'file-editor': { file: selectedFile },
    'new-folder-form': { currentId },
    'new-file-form': { currentId },
    'delete-dialog': { current }
  });
}, [], false);
