import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

defineComponent('breadcrumb-path', (el, props, state, emit) => {
  let id = model.app.currentId;
  if (id == null) {
    el.innerHTML = '<i>rotmappe</i>';
    return;
  }
  let breadcrumbs = [];
  while (id) {
    let f = model.filesAndFolders.find(f => f.id == id);
    breadcrumbs.unshift(`<span>${f.name}</span>`);
    id = f.parentId;
  }
  el.innerHTML = breadcrumbs.join(' > ');
});