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

function setCurrentId({ id }) {
  state.app.currentId = id;
  notify();
}

function clearCurrentId() {
  return setCurrentId({ id: null });
}

function saveFile({ id, content }) {
  const file = state.filesAndFolders.find(f => f.id === id);
  if (file && file.content !== undefined) {
    file.content = content;
    notify();
  }
}

function createFile({ name, parentId }) {
  const id = Date.now();
  state.filesAndFolders.push({ id, name, parentId, content: '' });
  notify();
}

function createFolder({ name, parentId }) {
  const id = Date.now();
  state.filesAndFolders.push({ id, name, parentId });
  notify();
}

function deleteItem({ id }) {
  const deleteRecursive = id => {
    const children = state.filesAndFolders.filter(f => f.parentId === id);
    for (const child of children) deleteRecursive(child.id);
    state.filesAndFolders = state.filesAndFolders.filter(f => f.id !== id);
  };
  deleteRecursive(id);
  state.app.currentId = null;
  notify();
}

function getViewState(appState) {
  const { currentId } = appState.app;
  const { filesAndFolders } = appState;

  const current = filesAndFolders.find(f => f.id === currentId);
  const currentFolder = current?.content
    ? filesAndFolders.find(f => f.id === current.parentId)
    : current;

  const files = filesAndFolders.filter(f => f.content && f.parentId === currentFolder?.id);
  const folders = filesAndFolders.filter(f => !f.content && f.parentId === currentFolder?.id);
  const selectedFile = current?.content ? current : null;

  return {
    currentId,
    current,
    currentFolder,
    files,
    folders,
    selectedFile
  };
}


export const model = {
  subscribe,
  setCurrentId,
  saveFile,
  createFile,
  createFolder,
  deleteItem, 
  getViewState
};