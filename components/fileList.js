import { defineComponent } from '../common/framework.js';

defineComponent('file-list', self => {
  const el = self.shadowRoot;
  let files = self.props.files;
  if (typeof files === 'string') {
    try {
      files = JSON.parse(files);
    } catch {
      files = [];
    }
  }

  let html = '';
  for (const file of files ?? []) {
    html += `<span>🗎</span> <a href="#" data-id="${file.id}">${file.name}</a><br/>`;
  }
  el.innerHTML = `<fieldset><legend>Filer</legend>${html}</fieldset>`;

  el.querySelectorAll('a').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      self.emit('select', { id: +a.dataset.id });
    };
  });
}, ['files']);