function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Filer og mapper</h1>
        Du er her: ${createSummarySelected()}<br/>
        ${createFoldersHtml()}
        ${createFilesHtml()}
        ${createEditFileHtml()}
        ${createNewFolderHtml()}
        ${createNewFileHtml()}
        ${deleteFileOrFolderHtml()}
    `;
}

function createSummarySelected() {
    let id = model.app.currentId;
    if (id == null) return '<i>rotmappe</i>';
    let breadcrumbs = '';
    while (id) {
        let fileOrFolder = model.filesAndFolders.find(f => f.id == id);
        if (breadcrumbs != '') breadcrumbs = ' > ' + breadcrumbs;
        breadcrumbs = fileOrFolder.name + breadcrumbs;
        id = fileOrFolder.parentId;
    }
    return breadcrumbs;
}

function createFoldersHtml() {
    let currentId = model.app.currentId;
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == currentId);
    let html = '';
    if (currentFileOrFolder != null) {
        html = `📁 <a href="javascript:select(${currentFileOrFolder.parentId})">..</a><br/>`;
        if (currentFileOrFolder.hasOwnProperty('content')) currentId = currentFileOrFolder.parentId;
    }
    for (let folder of model.filesAndFolders) {
        if (folder.hasOwnProperty('content') || folder.parentId != currentId) continue;
        html += `📁 <a href="javascript:select(${folder.id})">${folder.name}</a><br/>`;
    }
    return html;
}

function createFilesHtml() {
    let currentId = model.app.currentId;
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == currentId);
    if (currentFileOrFolder != null) {
        if (currentFileOrFolder.hasOwnProperty('content')) currentId = currentFileOrFolder.parentId;
    }
    let html = '';
    for (let file of model.filesAndFolders) {
        if (!file.hasOwnProperty('content') || file.parentId != currentId) continue;
        html += `<span>🗎</span> <a href="javascript:select(${file.id})">${file.name}</a><br/>`;
    }
    return html;
}

function createEditFileHtml() {
    const currentId = model.app.currentId;
    const currentFile = model.filesAndFolders.find(f => f.id == currentId);

    if (currentId == null || !currentFile.hasOwnProperty('content')) return '';
    return /*HTML*/`
        <textarea onchange="newContent = this.value">${currentFile.content}</textarea>    
        <br/>
        <button onclick="saveFileChanges(newContent)">Lagre</button>
        <button onclick="cancelFileChanges()">Avbryt</button>
    `;
}

function createNewFileHtml() {
    const currentFile = model.filesAndFolders.find(f => f.id == model.app.currentId);
    
    if (currentFile && currentFile.hasOwnProperty('content')) return '';
    return /*HTML*/`
        <input placeholder="Skriv inn filnavn" onchange="model.app.currentCreateNewFileInput = this.value">
        <button onclick="createNewFile()">Legg til ny fil</button>
        <br>`
}

function createNewFolderHtml() {
    const currentFolder = model.filesAndFolders.find(f => f.id == model.app.currentId);
    
    if (currentFolder && currentFolder.hasOwnProperty('content')) return '';
    return /*HTML*/`
        <br><br>
        <input placeholder="Skriv inn mappenavn" onchange="model.app.currentCreateNewFolderInput = this.value">
        <button onclick="createNewFolder()">Legg til ny mappe</button>
        <br>`
}

function deleteFileOrFolderHtml (){
    const currentId = model.app.currentId;

    if (currentId == null) return '';
    return /*HTML*/`
        <br><br>
        Delete current folder or file?
        <button onclick="deleteFileOrFolder()">Delete </button>
        <br>`
}
