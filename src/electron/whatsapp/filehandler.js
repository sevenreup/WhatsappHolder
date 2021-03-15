const path = require('path')
const fs = require('fs')
const unzipper = require('unzipper');
const {
    parseString
} = require('whatsapp-chat-parser')

const handleFile = async (upload, socket) => {
    const file = path.join(upload.path, '')
    console.log(file);
    try {
        if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(upload.mimetype)) {
            const zipPath = `./srv/unzips/${Date.now()}`
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
                            txtHandle(res.toString(), true)
                            entry.autodrain();
                        }).catch(err => {
                            console.log(err);
                            entry.autodrain();
                        });


                    } else {
                        entry.autodrain();
                    }
                })

        } else {
            const data = fs.readFileSync(file)
            txtHandle(data.toString(), false)
        }
    } catch (error) {

        console.log(error);
    }


}

const zipHandle = (zipPath) => {

}

const txtHandle = async (e, parseAttachments) => {
    try {
        const messages = await parseString(e, {
            parseAttachments
        })
        console.log(messages);
    } catch (error) {
        console.log(error);
    }
}

const getFileType = (filename) => {
    return filename.split('.').pop();
}

module.exports = {
    handleFile
}