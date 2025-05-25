import { defineComponent } from '../common/defineComponent.js';

defineComponent('file-list', (el, props, state, emit) => {
  let files = props.files;
  if (typeof files === 'string') {
    try {
      files = JSON.parse(files);
    } catch (e) {
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
      emit('select', { id: +a.dataset.id });
    };
  });
}, ['files']);