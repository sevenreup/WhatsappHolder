let id = 0;
let totalMessages = 100;

function fill(len) {
    const fn = () => {
        const item = {
            id,
            date: "2018-06-02T22:45:00.000Z", // Date object
            author: "Luke",
            message: "Hey how are you?, " + id,
            isOwner: id % 2
        }
        id++
        return item
    }
    return Array(len).fill().map(_ => fn())
}

const loadItems = (page, amount) => {
    const offset = (page * amount);
    if (offset < totalMessages) {
        return fill(amount)
    } else {
        return []
    }
}

let loadMore = () => (fill(1000));

const getChats = (len) => {
    const fn = () => {
        const item = {
            id: id,
            name: "Jon A (" + id + ")",
            isGroup: id % 3
        };
        id++
        return item
    }
    return Array(len).fill().map(_ => fn())
}

const getUserByID = (id) => {
    
}

export {
    loadItems,
    loadMore,
    getChats,
    getUserByID
}