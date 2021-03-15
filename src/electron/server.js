const express = require('express');
const cors = require('cors')
const multer = require('multer')
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

var app = express();
app.use(cors())

var upload = multer({
    storage: storage
})

app.post('/upload/files', upload.array('files'), (req, res) => {
    console.log(req.files);
    for (let file of req.files) {
        handleFile(file)
    }

    res.send({
        status: 'done',
        files: req.files
    })
})

module.exports = {
    app
}