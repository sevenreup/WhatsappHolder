let id = 0;
let totalMessages = 100;

function fill(len, user) {
    const fn = () => {
        const item = {
            id,
            date: "2018-06-02T22:45:00.000Z", // Date object
            author: id % 2 ? "Luke" : user.name,
            message: `Hey how are you?, ${id % 2 ? id : user.id}`,
            isOwner: id % 2
        }
        id++
        return item
    }
    return Array(len).fill().map(_ => fn())
}

const loadItems = (page, amount, user) => {
    const offset = (page * amount);
    if (offset < totalMessages) {
        return fill(amount, user)
    } else {
        return []
    }
}

let loadMore = () => (fill(1000));

const getChats = (len) => {
    let id2 = 0;
    const fn = () => {
        const item = {
            id: id2,
            name: "Jon A (" + id2 + ")",
            isGroup: id2 % 3
        };
        id2++
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