import {
    getThumbnails
} from 'video-metadata-thumbnails';

function getMediaPath(path, file) {
    return "http://localhost:8069/" + path + "/" + file;
}

function getApiPath(path) {
    return "http://localhost:8069/" + path
}
async function getVideoThumbnail(path) {
    return await getThumbnails(path, {
        quality: 0.6
    })
}

export {
    getMediaPath,
    getApiPath,
    getVideoThumbnail
}