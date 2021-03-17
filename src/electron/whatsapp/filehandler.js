const path = require('path')
const fs = require('fs')
const unzipper = require('unzipper');
const {
    parseString
} = require('whatsapp-chat-parser')

const handleFile = async (upload, io) => {
    const file = path.join(upload.path, '')
    console.log(file);
    try {
        if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(upload.mimetype)) {
            const zipPath = `./srv/unzips/${Date.now()}`
            io.sockets.emit('file-upload', {
                status: 'unziping'
            })
            fs.createReadStream(file)
                .pipe(unzipper.Parse()).on("entry", (entry) => {
                    const fileName = entry.path;
                    const type = entry.type;
                    const size = entry.vars.uncompressedSize;
                    const ext = getFileType(fileName)

                    console.log({
                        fileName,
                        type,
                        size,
                        ext
                    });
                    if (ext === 'txt') {
                        const content = entry.buffer().then(res => {
                            txtHandle(res.toString(), true, io)
                            entry.autodrain();
                        }).catch(err => {
                            io.sockets.emit('file-upload', {
                                status: 'error',
                                err
                            })
                            entry.autodrain();
                        });


                    } else {
                        entry.autodrain();
                    }
                })

        } else {
            const data = fs.readFileSync(file)
            txtHandle(data.toString(), false, io)
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

const txtHandle = async (e, parseAttachments, io) => {
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
        console.log(messages);
    } catch (error) {
        io.sockets.emit('file-upload', {
            status: 'error',
            error
        })
        console.log(error);
    }
}

const getFileType = (filename) => {
    return filename.split('.').pop();
}

module.exports = {
    handleFile
}