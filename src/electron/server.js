const path = require('path')
const express = require('express');
const cors = require('cors')
const multer = require('multer')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

require('./db/db')

const dbPath = /** path.join(electronApp.getPath('userData'), 'Cache'); **/ './srv/db';

var app = express();
const http = require('http').Server(app)
app.use(cors())

const pouch = require('express-pouchdb')({
    mode: 'fullCouchDB',
    overrideMode: {
        include: ['routes/fauxton']
    }
})

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    initSockets(socket)
})

const {
    handleFile
} = require('./whatsapp/filehandler');
const {
    initSockets
} = require('./whatsapp/socketImports');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './srv/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

app.post('/upload/files', upload.array('files'), (req, res) => {
    io.sockets.emit('file-upload', {
        status: 'processing',
        files: req.files
    })
    for (let file of req.files) {
        handleFile(file, io)
    }
    res.send({
        status: 'done',
        files: req.files
    })
})

pouch.setPouchDB(require('pouchdb').defaults({
    prefix: path.join(dbPath, 'db/')
}));

module.exports = {
    http,
}