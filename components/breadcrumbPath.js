import { defineComponent } from '../common/framework.js';

defineComponent('breadcrumb-path', ['currentId'], self => {
  const el = self.shadowRoot;
  const currentId = self.props.currentId;
  let breadcrumbs = [];
  let id = currentId;
  try {
    const all = JSON.parse(localStorage.getItem('files')) || [];
    while (id) {
      const f = all.find(f => f.id == id);
      if (!f) break;
      breadcrumbs.unshift(`<span>${f.name}</span>`);
      id = f.parentId;
    }
  } catch {
    breadcrumbs = [];
  }

  el.innerHTML = `<fieldset><legend>Her er du nå</legend>${breadcrumbs.length > 0 ? breadcrumbs.join(' > ') : '<i>rotmappe</i>'}</fieldset>`;
});