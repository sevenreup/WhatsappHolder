const getFileType = (filename) => {
    return filename.split('.').pop();
}

function createPath(fs, dir) {
    fs.ensureDir(dir).then(() => console.log("Created", dir)).catch(err => console.log(err))
}

const createRequiredPaths = () => {
    const fs = require('fs-extra')
    const dirs = ['./srv/uploads/temp', './srv/uploads/files']
    dirs.forEach(dir => {
        createPath(fs, dir)
    });
}

module.exports = {
    getFileType,
    createRequiredPaths
}