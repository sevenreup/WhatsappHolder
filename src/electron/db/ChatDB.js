const {
    chatDB
} = require("./db");


async function saveImportedChats(data) {
    console.log(data);
    return await chatDB.post(data)
}

async function getAllChatsDB() {
    return await chatDB.allDocs({include_docs: true})
}

async function getChatDB(id) {
    return await chatDB.get(id)
}

async function updateChat(data) {
    return await chatDB.put(data)
}


module.exports = {
    saveImportedChats,
    getAllChatsDB,
    getChatDB,
    updateChat
}
