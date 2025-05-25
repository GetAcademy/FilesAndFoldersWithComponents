import { defineComponent } from '../common/defineComponent.js';

defineComponent('breadcrumb-path', (el, props) => {
  const currentId = props.currentId;
  let breadcrumbs = [];
  let id = currentId;
  try {
    while (id) {
      const all = JSON.parse(localStorage.getItem('files')) || [];
      const f = all.find(f => f.id == id);
      if (!f) break;
      breadcrumbs.unshift(`<span>${f.name}</span>`);
      id = f.parentId;
    }
  } catch {
    breadcrumbs = [];
  }

  el.innerHTML = `<fieldset><legend>Her er du nå</legend>${breadcrumbs.length > 0 ? breadcrumbs.join(' > ') : '<i>rotmappe</i>'}</fieldset>`;
}, ['currentId']);