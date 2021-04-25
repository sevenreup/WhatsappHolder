const {
    messageDB
} = require("./db");

async function saveImportedChats(data) {
    console.log(data);
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

async function getChatWithID(id) {
    return await messageDB.get(id)
}

async function getMediaPreview(id) {
    return await messageDB.find({
        selector: {
            isMedia: true,
        },
        limit: 6
    })
}


module.exports = {
    saveImportedChats,
    getAllChats,
    updateMediaFolder,
    getChatWithID,
    getMediaPreview
}