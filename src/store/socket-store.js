import io from 'socket.io-client';
import {
    writable
} from 'svelte/store';

const socket = io('http://localhost:8069')

let socketID = writable(null);
let uploadProgress = writable(null);

socket.on('connect', () => {
    console.log("connected 🍕");
    socketID.set(socket.id)
})

socket.on('reconnect', () => {
    socketID.set(socket.id)
})

socket.on('file-upload', (argd) => {
    uploadProgress.set(argd)
    console.log('started processing the file', argd);
})

socket.on('import-finished', () => {
    uploadProgress.set({
        status: 'import-compelete'
    })
    console.log('import-finished');
})

function sendImportDetails(details) {
    socket.emit('finish-import', details);
}

export {
    socketID,
    uploadProgress,
    sendImportDetails
}