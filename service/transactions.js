const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTransactions(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`Select * from transactions LIMIT ${offset}, ${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = {
        page
    };

    return {
        data,
        meta
    }
}
async function getTransactionsId(page = 1, uuid) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`Select * from transactions where uuid ="${uuid}" LIMIT ${offset}, ${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = {
        page
    };

    return {
        data,
        meta
    }
}

async function postTransactions(transactions) {
    let message;
    const findProduct = await db.query(`select * from products where uuid="${transactions.uuid}"`);

    const productPrice = findProduct[0].price;
    const productQty = findProduct[0].quantity;
    const productId = findProduct[0].id;
    if (transactions.uuid === null && transactions.user_id === null && transactions.uuid === undefined && transactions.user_id === undefined && transactions.amount === null && transactions.amount === undefined) {
        return message = `Data Not Null`;
    }
    const productTotal = transactions.amount * productPrice;
    if (productQty === 0) {
        return message = `Stok barang kosong`;
    }
    const jumnlahQuantity = productQty - transactions.amount;
    const pajakDiskon = (10 * productTotal) / 100;
    const totalAdmin = (5 * productTotal) / 100 + pajakDiskon;
    const totalSemua = productTotal + pajakDiskon + totalAdmin

    const updateStok = db.query(`UPDATE products SET quantity=${jumnlahQuantity} WHERE uuid ="${transactions.uuid}"`)
    const inserttransactions = db.query(`INSERT INTO transactions (uuid,user_id,product_id,amount,tax,admin_fee,total,created_at,updated_at,deleted_at) VALUES ("${transactions.uuid}",${transactions.user_id},${productId},${transactions.amount},${pajakDiskon},${totalAdmin},${totalSemua},now(),now(),null)`);
    if (!inserttransactions.affectedRows || !updateStok.affectedRows) {
        return message = 'Add transactions has Successful';
    } else {
        return message = 'Error in borrows transactions';
    }
}




module.exports = {
    getTransactions,
    getTransactionsId,
    postTransactions,
}