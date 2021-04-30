const path = require('path')
const express = require('express');
const cors = require('cors')
const multer = require('multer')
const {
    handleFile,
    uploadProfile
} = require('./whatsapp/filehandler');
const {
    initSockets
} = require('./whatsapp/socketImports');
const {
    createRequiredPaths
} = require('./util/fileUtils');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

require('./db/db')

const dbPath = /** path.join(electronApp.getPath('userData'), 'Cache'); **/ './srv/db';

createRequiredPaths()

var app = express();
const http = require('http').Server(app)
app.use(cors())
app.use(express.static('./srv/media'))
app.use(express.static('./public'))

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

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './srv/uploads/files')
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

app.post('/upload/profile/:id', upload.array('files'), async (req, res) => {
    const id = req.params.id
    try {
        for (let file of req.files) {
            await uploadProfile(file, id)

            res.send("uploaded")
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("failed")
    }

})

pouch.setPouchDB(require('pouchdb').defaults({
    prefix: path.join(dbPath, 'db/')
}));

module.exports = {
    http,
}