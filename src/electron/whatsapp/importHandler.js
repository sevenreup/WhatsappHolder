const {
    saveNewContacts,
    getAllByID
} = require('../db/ContactsDB');
const {
    getTempMessages,
    deleteTempMessages
} = require('../db/ImportDB');
const {
    saveImportedChats
} = require('../db/MessagesDB');
const {
    getFileType
} = require('../util/fileUtils');
const {
    finishImportZip,
    deleteProcessedFile
} = require('./filehandler')

async function finishImport({
    id,
    selectedUser,
    useImports
}) {
    try {
        const {
            messages,
            isZip,
            extra,
            users
        } = await getTempMessages(id)

        const participants = await getChatUsersInformation(users, selectedUser, useImports)
        const hash = createUserHash(participants)

        const data = messages.map(message => {
            message.isMedia = false;
            message.isOwner = false;
            if (message.attachment !== null && message.attachment !== undefined) {
                message.isMedia = true;
                message.attachment.ext = getFileType(message.attachment.fileName);
            }
            if (selectedUser == message.author && useImports == true) {
                message.isOwner = true
            } else {
                message.author = hash[message.author]._id
            }
            return message
        });


        const config = {
            isConfig: true,
        }

        data.push(config);

        const chat = await saveImportedChats({
            messages: data,
            config,
            name: 'random',
            users: hash
        })

        if (isZip) {
            try {
                const data = await finishImportZip(chat.id, extra.tempFolder)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        await deleteProcessedFile(extra.processedFile)
        return await deleteTempMessages(id)
    } catch (error) {
        console.log(error);
    }

}

async function getChatUsersInformation(users, mine, useRaw) {
    const saves = users.map(user => {
        if (user !== mine || user !== 'System') {
            return {
                name: user
            }
        }
    })
    try {
        const docs = await saveNewContacts(saves)
        const ids = docs.map(doc => ({
            id: doc.id
        }))
        const {
            results
        } = await getAllByID(ids);
        const contacts = results.map(raw => {
            if (raw.docs.length > 0) {
                if (raw.docs[0].ok !== null && raw.docs[0].ok !== undefined) {
                    const user = raw.docs[0].ok
                    return {
                        _id: user._id,
                        name: user.name
                    }
                }
            }
        })
        return contacts;

    } catch (error) {
        console.log(error);
    }
}

function createUserHash(users) {
    const data = {}
    users.map(user => {
        data[user.name] = user
    })
    return data
}

module.exports = {
    finishImport
}