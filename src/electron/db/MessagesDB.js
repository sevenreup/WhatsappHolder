const {
    messageDB
} = require("./db");

function saveImportedChats(data) {
    return await messageDB.post(data)
}

module.exports = {
    saveImportedChats
}