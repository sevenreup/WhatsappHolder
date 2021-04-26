const {
    messageDB
} = require("./db");

async function saveImportedMessagesDB(data) {
    console.log(data);
    return await messageDB.bulkDocs(data)
}

async function getMediaPreview(id) {
    return await messageDB.find({
        selector: {
            chatID: {
                $eq: id
            },
            isMedia: true,
        },
        limit: 6
    })
}

async function getAllMessages(id) {
    return await messageDB.find({
        selector: {
            chatID: {
                $eq: id
            },
            date: {
                $gt: true
            }
        },
        sort: [{
            date: 'asc'
        }]
    })
}

module.exports = {
    saveImportedMessagesDB,
    getMediaPreview,
    getAllMessages
}