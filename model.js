const listeners = [];

const state = {
  filesAndFolders: [
    { id: 1, name: 'Prosjekt', parentId: null },
    { id: 2, name: 'todo.txt', parentId: 1, content: 'Kjøp melk\nRing Per' },
    { id: 3, name: 'notater.md', parentId: 1, content: '# Møte\nAvtale kl 14' },
  ],
  app: {
    currentId: 1
  }
};

function notify() {
  const copy = structuredClone(state);
  for (const l of listeners) l(copy);
}

function subscribe(callback) {
  listeners.push(callback);
  callback(structuredClone(state));
  return () => listeners.splice(listeners.indexOf(callback), 1);
}

function setCurrentId(id) {
  state.app.currentId = id;
  notify();
}

function saveFile(id, content) {
  const file = state.filesAndFolders.find(f => f.id === id);
  if (file && file.content !== undefined) {
    file.content = content;
    notify();
  }
}

function createFile(name, parentId) {
  const id = Date.now();
  state.filesAndFolders.push({ id, name, parentId, content: '' });
  notify();
}

function createFolder(name, parentId) {
  const id = Date.now();
  state.filesAndFolders.push({ id, name, parentId });
  notify();
}

function deleteItem(id) {
  const deleteRecursive = id => {
    const children = state.filesAndFolders.filter(f => f.parentId === id);
    for (const child of children) deleteRecursive(child.id);
    state.filesAndFolders = state.filesAndFolders.filter(f => f.id !== id);
  };
  deleteRecursive(id);
  state.app.currentId = null;
  notify();
}

export const model = {
  subscribe,
  setCurrentId,
  saveFile,
  createFile,
  createFolder,
  deleteItem
};