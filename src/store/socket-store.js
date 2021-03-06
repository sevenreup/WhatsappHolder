import io from 'socket.io-client';
import {
    writable
} from 'svelte/store';
import {
    activeChat
} from '.';

const socket = io('http://localhost:8069')

let socketID = writable(null);
let uploadProgress = writable(null);
let chats = writable([])
let messages = writable([])
let sideInfo = writable([])
let allMedia = writable([])
let reload = writable(null)

socket.on('connect', () => {
    console.log("connected 🍕");
    socketID.set(socket.id)
})

socket.on('reconnect', () => {
    socketID.set(socket.id)
})

socket.on('file-upload', (args) => {
    uploadProgress.set(args)
    console.log('started processing the file', args);
})

socket.on('import-finished', () => {
    uploadProgress.set({
        status: 'import-compelete'
    })
    console.log('import-finished');
})

socket.on('all-chats', (args) => {
    console.log(args);
    chats.set(args)
})

socket.on('chat', (args) => {
    activeChat.set(args)
})

socket.on('all-messages', (args) => {
    messages.set(args)
})

socket.on('search-results', (args) => {
    console.log(args);
    chats.set(args)
})

socket.on('preview-chat-media', data => {
    sideInfo.set(data)
})

socket.on('chat-media-all', data => {
    allMedia.set(data)
})

socket.on('chat-edit-saved', () => {
    reload.set(true)
})

function getAllChats() {
    socket.emit('getchats')
}

function getChat(id) {
    socket.emit('getchat', id)
}

function getAllMessages(id) {
    socket.emit('getMessages', id)
}

function sendImportDetails(details) {
    socket.emit('finish-import', details);
}

function openFileElectron(folder, file) {
    socket.emit('open-file', {
        folder,
        file
    })
}

function openLinkElectron(link) {
    socket.emit('open-link', link)
}

function getChatMediaPreview(id) {
    socket.emit('get-chat-media', id)
}

function getAllMedia(id) {
    socket.emit('get-chat-media-all', id)
}

function saveChatEdits(chat) {
    socket.emit('save-chat-edits', chat)
}

function searchChat(text) {
    socket.emit('search', {
        text: text,
        descending: true
    })
}

export {
    socketID,
    uploadProgress,
    chats,
    messages,
    sideInfo,
    allMedia,
    reload,
    getAllChats,
    getChat,
    getAllMessages,
    sendImportDetails,
    openFileElectron,
    openLinkElectron,
    getChatMediaPreview,
    getAllMedia,
    saveChatEdits,
    searchChat
}