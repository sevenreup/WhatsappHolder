const { getAllChats, getChatWithID, getMediaPreview } = require("../db/MessagesDB")

async function getChats() {
    return await getAllChats()
}

async function getChat(id) {
    return await getChatWithID(id)
}


async function getPreviewMedia(id) {
    return await getMediaPreview(id)
}

module.exports = {
    getChats,
    getChat,
    getPreviewMedia
}