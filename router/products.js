const express = require('express');
const router = express.Router();
const products = require('../service/products');

router.get('/', async function (req, res, next) {
    try {
        res.json(await products.getProducts(req.query.page));
    } catch (err) {
        console.error('Error while getting products', err.message);
        next(err);
    }
});
router.get('/:uuid', async function (req, res, next) {
    try {
        res.json(await products.getProductsId(req.query.page, req.params.uuid));
    } catch (err) {
        console.error('Error while getting products', err.message);
        next(err);
    }
});
router.post('/', async function (req, res, next) {
    try {
        res.json(await products.postProducts(req.body));
    } catch (err) {
        console.error('Error while getting products', err.message);
        next(err);
    }
});
router.post('/:uuid', async function (req, res, next) {
    try {
        res.json(await products.update(req.params.uuid, req.body));
    } catch (err) {
        console.error('Error while getting products', err.message);
        next(err);
    }
});
router.delete('/:uuid', async function (req, res, next) {
    try {
        res.json(await products.getDelete(req.params.uuid));
    } catch (err) {
        console.error('Error while getting products', err.message);
        next(err);
    }
});
module.exports = router;