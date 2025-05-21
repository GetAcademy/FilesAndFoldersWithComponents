import { defineComponent } from './defineComponent.js';
import { model } from '../model.js';

const getBreadcrumbs = () => {
  let id = model.app.currentId;
  if (id == null) return '<i>rotmappe</i>';
  let breadcrumbs = [];
  while (id) {
    let f = model.filesAndFolders.find(f => f.id == id);
    breadcrumbs.unshift(`<span>${f.name}</span>`);
    id = f.parentId;
  }
  return breadcrumbs.join(' > ')
};

defineComponent('breadcrumb-path', (el, props, state, emit) => {
  el.innerHTML = `<fieldset><legend>Her er du nå</legend>${getBreadcrumbs()}</fieldset>`;
});