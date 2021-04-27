const {
    openFileInProgram
} = require("../util/fileUtils");
const {
    getChats,
    getPreviewMedia,
    getMessages,
    getAllMedia
} = require("./chatHandler");
const {
    finishImport
} = require("./importHandler");

function initSockets(socket) {
    console.log('A user connected');

    socket.on('finish-import', async (arg) => {
        console.log(arg);
        finishImport(arg).then((res) => {
            console.log(res);
            socket.emit("import-finished");
        }).catch((err) => {

        })
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('getchats', async function () {
        try {
            const {
                rows
            } = await getChats()
            socket.emit("all-chats", rows);
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('getMessages', async function (args) {
        try {
            const {docs} = await getMessages(args)
            socket.emit("all-messages", docs);
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('open-file', async (args) => {
        try {
            await openFileInProgram(args.folder, args.file)
        } catch (error) {
            console.log(error);
        }

    })

    socket.on('open-link', async (args) => {
        try {
            await require('electron').shell.openExternal(args)
        } catch (error) {
            console.log(error)
        }

    })

    socket.on('get-chat-media', async (id) => {
        try {
            const {docs} = await getPreviewMedia(id)
            socket.emit("preview-chat-media", docs);
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('get-chat-media-all', async (id) => {
        try {
            const {docs} = await getAllMedia(id)
            socket.emit("chat-media-all", docs);
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    initSockets
}