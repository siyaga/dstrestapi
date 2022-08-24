const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getProducts(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`Select * from products LIMIT ${offset}, ${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = {
        page
    };

    return {
        data,
        meta
    }
}
async function getProductsId(page = 1, uuid) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`Select * from products where uuid ="${uuid}" LIMIT ${offset}, ${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = {
        page
    };

    return {
        data,
        meta
    }
}

async function postProducts(product) {
    let message;

    const insertProduct = db.query(`INSERT INTO products (uuid,name,type,price,quantity,created_at,updated_at,deleted_at) VALUES ("${product.uuid}","${product.name}","${product.type}",${product.price},${product.quantity},now(),now(),null)`);
    if (!insertProduct.affectedRows) {
        return message = 'Add Products has Successful';
    } else {
        return message = 'Error in borrows Products';
    }
}

async function update(uuid, product) {
    const result = db.query(
        `UPDATE products SET name="${product.name}",type="${product.type}",price=${product.price},quantity=${product.quantity},updated_at=now() WHERE uuid ="${uuid}"`
    );
    let message = 'Error in update products';

    if (!result.affectedRows) {
        message = 'Product Update Successful';
    }

    return {
        message
    };
}

async function getDelete(uuid) {
    const deleteProduct = db.query(
        `DELETE FROM products WHERE uuid="${uuid}"`
    );
    let message = 'Error in update products';

    if (!deleteProduct.affectedRows) {
        return message = 'Add Products has Successful';
    } else {
        return message = 'Error in borrows Products';
    }
}




module.exports = {
    getProducts,
    getProductsId,
    postProducts,
    update,
    getDelete
}