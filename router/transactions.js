const express = require('express');
const router = express.Router();
const transactions = require('../service/transactions');

router.get('/', async function (req, res, next) {
    try {
        res.json(await transactions.getTransactions(req.query.page));
    } catch (err) {
        console.error('Error while getting transactions', err.message);
        next(err);
    }
});
router.get('/:uuid', async function (req, res, next) {
    try {
        res.json(await transactions.getTransactionsId(req.query.page, req.params.uuid));
    } catch (err) {
        console.error('Error while getting transactions', err.message);
        next(err);
    }
});
router.post('/', async function (req, res, next) {
    try {
        res.json(await transactions.postTransactions(req.body));
    } catch (err) {
        console.error('Error while getting transactions', err.message);
        next(err);
    }
});
module.exports = router;