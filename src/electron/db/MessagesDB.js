const {
    messageDB
} = require("./db");

async function saveImportedChats(data) {
    return await messageDB.post(data)
}

async function getAllChats() {
    return await messageDB.allDocs({include_docs: true})
}

module.exports = {
    saveImportedChats,
    getAllChats
}