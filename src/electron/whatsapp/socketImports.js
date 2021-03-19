const {
    finishImport
} = require("./importHandler");

function initSockets(socket) {
    console.log('A user connected');

    socket.on('finish-import', async (arg) => {
        console.log(arg);
        finishImport(arg).then((res) => {
            socket.emit("import-finished");
        }).catch((err) => {

        })
    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
}

module.exports = {
    initSockets
}