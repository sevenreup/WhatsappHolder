const express = require('express');
const cors = require('cors')
const multer = require('multer')

var app = express();
const http = require('http').Server(app)
app.use(cors())

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
})

const {
    handleFile
} = require('./whatsapp/filehandler')

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
    console.log(req.files);
    for (let file of req.files) {
        handleFile(file, io)
    }

    res.send({
        status: 'done',
        files: req.files
    })
})

module.exports = {
    http
}