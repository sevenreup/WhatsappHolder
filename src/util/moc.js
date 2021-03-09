let id = 0;

function fill(len) {
    const fn = () => {
        const item = {
            id,
            date: "2018-06-02T22:45:00.000Z", // Date object
            author: "Luke",
            message: "Hey how are you?, " + id,
        }
        id++
        return item
    }
    return Array(len).fill().map(_ => fn())
}

const loadMore = () => {
    return fill(10)
}

let loadItems = () => (fill(1000));

export {
    loadItems,
    loadMore
}