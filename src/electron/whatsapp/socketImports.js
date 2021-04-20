const {
    openFileInProgram
} = require("../util/fileUtils");
const {
    getChats
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
}

module.exports = {
    initSockets
}