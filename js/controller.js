function select(id) {
    model.app.currentId = id;
    model.app.currentCreateNewFolderInput = null;
    model.app.currentCreateNewFileInput = null;
    updateView();
}

function saveFileChanges(newContent) {
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == model.app.currentId);
    currentFileOrFolder.content = newContent;
}

function cancelFileChanges() {
    updateView();
}

function createNewFile() {
    const newFileId = 1 + model.filesAndFolders.reduce((maxId, f) => Math.max(maxId, f.id), 0);
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == model.app.currentId);
    const newFileName = model.app.currentCreateNewFileInput;


    if (model.app.currentId == null && newFileName) {
        model.filesAndFolders.push({id: newFileId, 
            name: newFileName,
            content:'',})
    } else if (!currentFileOrFolder.hasOwnProperty('content') && newFileName) {
        model.filesAndFolders.push({id: newFileId, 
                                    name: newFileName,
                                    parentId: currentFileOrFolder.id,
                                    content:'',})
    }
    model.app.currentCreateNewFileInput = null;
    model.app.currentCreateNewFolderInput = null;
    updateView();
}

function createNewFolder() {
    const newFolderId = 1 + model.filesAndFolders.reduce((maxId, f) => Math.max(maxId, f.id), 0);
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == model.app.currentId);
    const newFolderName = model.app.currentCreateNewFolderInput;

    if (model.app.currentId == null && newFolderName) {
        model.filesAndFolders.push({id: newFolderId, 
                                    name: newFolderName,
                                    });
    } else if (!currentFileOrFolder.hasOwnProperty('content') && newFolderName) {
        model.filesAndFolders.push({id: newFolderId, 
                                    name: newFolderName,
                                    parentId: currentFileOrFolder.id,
                                    });
    }
    model.app.currentCreateNewFolderInput = null;
    model.app.currentCreateNewFileInput = null;
    updateView();
}

function deleteFileOrFolder() {
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id === model.app.currentId);
   
    if (!currentFileOrFolder) return;
    if (confirm(`Er du helt sikker på at du ønsker å slette følgende fil eller mappe inkludert alt innholdet i den: "${currentFileOrFolder.name}" ?`)) {
        deleteChildrensChildren(model.app.currentId);
        model.filesAndFolders = model.filesAndFolders.filter(f => f.id !== model.app.currentId);
        model.app.currentId = currentFileOrFolder.parentId ?? null;
    }
    updateView();
}

function deleteChildrensChildren(id) {
    const children = model.filesAndFolders.filter(f => f.parentId === id);
    
    for (const child of children) {
        deleteChildrensChildren(child.id);
        model.filesAndFolders = model.filesAndFolders.filter(f => f.id !== child.id);
    }
}