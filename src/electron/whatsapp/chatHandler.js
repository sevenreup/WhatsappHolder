const { getAllChats } = require("../db/MessagesDB")

async function getChats() {
    return await getAllChats()
}

module.exports = {
    getChats
}