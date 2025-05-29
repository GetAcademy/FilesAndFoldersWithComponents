const listeners = [];

const state = {
  filesAndFolders: [
    { id: 1, name: 'Emne 1' },
    { id: 2, name: 'Emne 2' },
    { id: 3, name: 'Emne 3' },
    { id: 4, name: 'Semesterplan.md', content: 'Semesterplan' },
    { id: 5, name: 'Uke 1', parentId: 1 },
    { id: 6, name: 'Uke 2', parentId: 1 },
    { id: 7, name: 'Plan for emne 1.md', content: 'Emneplan', parentId: 1 },
    { id: 8, name: 'Plan for emne 2.md', content: 'Emneplan', parentId: 2 },
    { id: 9, name: 'Plan for emne 3.md', content: 'Emneplan', parentId: 2 },
  ],
  app: {
    currentId: null
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

function createNew({ name, parentId, isFolder }) {
  const id = Date.now();
  const newItem = { id, name, parentId };
  if (!isFolder) newItem.content = '';
  state.filesAndFolders.push(newItem);
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

  const isFile = f => f.content !== undefined;
  const isFolder = f => f.content === undefined;
  const current = filesAndFolders.find(f => f.id === currentId) ?? null;
  const currentFolder = getCurrentFolder(current, filesAndFolders);
  const isInCorrectFolder = f => (f?.parentId ?? null) === currentFolder.id;

  const files = filesAndFolders.filter(f => isFile(f) && isInCorrectFolder(f));
  const folders = filesAndFolders.filter(f => isFolder(f) && isInCorrectFolder(f));
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

function getCurrentFolder(current, filesAndFolders) {
  const root = { id: null, name: 'Rotmappe' };
  if (current === null) return root;
  const isFolder = current.content === undefined
  if (isFolder) return current;
  const currentFolder = filesAndFolders.find(
    f => f.id === current.parentId);
  return currentFolder ?? root;
}


export const model = {
  subscribe,
  setCurrentId,
  saveFile,
  createNew,
  deleteItem,
  getViewState
};