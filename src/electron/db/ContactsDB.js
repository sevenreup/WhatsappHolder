const {
    contactsDB
} = require("./db");

async function saveNewContacts(contacts) {
    return await contactsDB.bulkDocs(contacts);
}

async function getAllByID(ids) {
    return await contactsDB.bulkGet({
        docs: ids
    });
}

module.exports = {
    saveNewContacts,
    getAllByID
}