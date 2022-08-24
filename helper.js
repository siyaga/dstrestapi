function getOffset(currentPage = 1, listPerpage) {
    return (currentPage - 1) * [listPerpage];


}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows
}

module.exports = {
    getOffset,
    emptyOrRows
}