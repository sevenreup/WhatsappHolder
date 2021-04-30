const {
    getMediaPreview,
    saveImportedMessagesDB,
    getAllMessages,
    getMediaAll
} = require("../db/MessagesDB")

const {
    getChatDB,
    updateChat,
    saveImportedChats,
    getAllChatsDB
} = require("../db/ChatDB")

async function getChats() {
    return await getAllChatsDB()
}

async function getChat(id) {
    return await getChatDB(id)
}

async function editChat(id, data) {
    const doc = await getChat(id)
    const newOb = {
        ...doc,
        ...data
    }
    return await updateChat(newOb)
}

async function getMessages(id) {
    return await getAllMessages(id)
}

async function getPreviewMedia(id) {
    return await getMediaPreview(id)
}

async function getAllMedia(id) {
    return await getMediaAll(id)
}

async function createChat(data) {
    return await saveImportedChats(data)
}

async function updateMediaFolder(id, folder) {
    const doc = await getChat(id)
    doc.folder = folder
    return await updateChat(doc)
}

async function updateImage(id, img) {
    const doc = await getChat(id)
    doc.img = img
    return await updateChat(doc)
}

async function saveImportedMessages(messages) {
    return saveImportedMessagesDB(messages)
}

module.exports = {
    getChats,
    getChat,
    getMessages,
    getPreviewMedia,
    getAllMedia,
    createChat,
    createChat,
    saveImportedMessages,
    updateMediaFolder,
    editChat,
    updateImage
}