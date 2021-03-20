const {
    messageDB
} = require("./db");

async function saveImportedChats(data) {
    return await messageDB.post(data)
}

module.exports = {
    saveImportedChats
}