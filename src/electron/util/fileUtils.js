const getFileType = (filename) => {
    return filename.split('.').pop();
}

module.exports = {
    getFileType
}