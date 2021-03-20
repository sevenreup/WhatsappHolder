const {
    zipperDB
} = require('./db')


const addTempData = async (messages, isZip, users, extra = {}) => {
    const data = {
        messages,
        isZip,
        extra,
        users
    }

    return await zipperDB.post(data, {
        force: true
    })
}

const getTempMessages = async (id) => {
    return await zipperDB.get(id);
}

const deleteTempMessages = async (id) => {
    try {
        const doc = await zipperDB.get(id)
        return await zipperDB.remove(doc)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addTempData,
    getTempMessages,
    deleteTempMessages
}