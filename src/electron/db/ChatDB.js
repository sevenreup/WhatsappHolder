const {
    chatDB
} = require("./db");


async function saveImportedChats(data) {
    console.log(data);
    return await chatDB.post(data)
}

async function getAllChatsDB() {
    return await chatDB.allDocs({
        include_docs: true
    })
}

async function getChatDB(id) {
    return await chatDB.get(id)
}

async function updateChat(data) {
    return await chatDB.put(data)
}
async function searchDB(text, descending) {
    return await chatDB.query('full_text_search/by_name', {
        include_docs: true,
        descending: descending,
        startkey: descending ? text + '\uFFF0' : text,
        endkey: descending ? text : text + '\uFFF0'
    })
}


module.exports = {
    saveImportedChats,
    getAllChatsDB,
    getChatDB,
    updateChat,
    searchDB
}