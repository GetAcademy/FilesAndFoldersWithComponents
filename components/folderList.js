import { defineComponent } from '../common/framework.js';

defineComponent('folder-list', self => {
  const el = self.shadowRoot;
  let folders = self.props.folders;
  if (typeof folders === 'string') {
    try {
      folders = JSON.parse(folders);
    } catch {
      folders = [];
    }
  }
  const currentId = self.props.currentId;

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
      self.emit('select', { id });
    };
  });
}, ['folders', 'currentId']);