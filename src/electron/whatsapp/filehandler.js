const path = require('path')
const fs = require('fs-extra')
const unzipper = require('unzipper');
const {
    parseString
} = require('whatsapp-chat-parser')
const ImportDB = require('../db/ImportDB');
const {
    getFileType
} = require('../util/fileUtils');

const handleFile = async (upload, io) => {
    const file = path.join(upload.path, '')
    try {
        if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(upload.mimetype)) {
            io.sockets.emit('file-upload', {
                status: 'unziping'
            })

            fs.mkdtemp('./srv/uploads/temp/wap-', (err, folder) => {
                if (err) throw err
                fs.createReadStream(file)
                    .pipe(unzipper.Parse())
                    .on("entry", (entry) => {
                        const fileName = entry.path;
                        const type = entry.type;
                        const size = entry.vars.uncompressedSize;
                        const ext = getFileType(fileName)

                        // console.log({
                        //     fileName,
                        //     type,
                        //     size,
                        //     ext
                        // });

                        if (ext === 'txt') {
                            entry.buffer().then(res => {
                                txtHandle(res.toString(), true, io, {
                                    tempFolder: folder,
                                    processedFile: file
                                })
                                entry.autodrain();
                            }).catch(err => {
                                io.sockets.emit('file-upload', {
                                    status: 'error',
                                    err
                                })
                                entry.autodrain();
                            });


                        } else {
                            entry.pipe(fs.createWriteStream(path.join(folder, fileName))).on('finish', () => console.log('done'))
                        }
                    })
            })



        } else {
            const data = fs.readFileSync(file)
            txtHandle(data.toString(), false, io, {
                processedFile: file
            })
        }
    } catch (error) {
        io.sockets.emit('file-upload', {
            status: 'error',
            error
        })
        console.log(error);
    }


}

const zipHandle = (zipPath) => {

}

const txtHandle = async (e, parseAttachments, io, extras = {}) => {
    try {
        io.sockets.emit('file-upload', {
            status: 'parsing messages'
        })
        const messages = await parseString(e, {
            parseAttachments
        })
        io.sockets.emit('file-upload', {
            status: 'message parsing complete'
        })
        const unique = [...new Set(messages.map(item => item.author))];
        console.log(unique);
        const {
            id
        } = await ImportDB.addTempData(messages, parseAttachments, unique, extras)
        io.sockets.emit('file-upload', {
            status: 'finished',
            names: unique,
            id
        })
    } catch (error) {
        io.sockets.emit('file-upload', {
            status: 'error',
            error
        })
        console.log(error);
    }
}

const finishImportZip = async (id, folder) => {

    try {
        const neeFolder = './srv/media/' + id
        await fs.move(folder, neeFolder)
        return neeFolder + id
    } catch (error) {
        console.log(error);
    }
}

const deleteProcessedFile = async (file) => {
    return await fs.remove(file)
}

module.exports = {
    handleFile,
    finishImportZip,
    deleteProcessedFile
}