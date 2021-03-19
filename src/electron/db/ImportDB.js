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

module.exports = {
    addTempData,
    getTempMessages
}