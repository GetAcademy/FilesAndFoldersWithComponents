import { defineComponent } from '../common/defineComponent.js';

defineComponent('folder-list', (el, props, state, emit) => {
  let folders = props.folders;
  if (typeof folders === 'string') {
    try {
      folders = JSON.parse(folders);
    } catch {
      folders = [];
    }
  }
  const currentId = props.currentId;

  let html = '';
  if (currentId != null) {
    html += `📁 <a href="#" data-id="..">..</a><br/>`;
  }

  for (const folder of folders ?? []) {
    html += `📁 <a href="#" data-id="${folder.id}">${folder.name}</a><br/>`;
  }

  el.innerHTML = `<fieldset><legend>Mapper</legend>${html}</fieldset>`;

  el.querySelectorAll('a').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      const id = a.dataset.id === '..' ? 'parent' : +a.dataset.id;
      emit('select', { id });
    };
  });
}, ['folders', 'currentId']);