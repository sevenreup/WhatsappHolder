const {
    messageDB
} = require("./db");

async function saveImportedChats(data) {
    return await messageDB.post(data)
}

async function updateMediaFolder(id, folder) {
    const doc = await messageDB.get(id)
    var config = doc.config
    if (config == undefined || config == null)
        config = {}
    config.folder = folder
    doc.config = config
    return await messageDB.put(doc)
}

async function getAllChats() {
    return await messageDB.allDocs({include_docs: true})
}

module.exports = {
    saveImportedChats,
    getAllChats,
    updateMediaFolder
}