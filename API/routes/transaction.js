import express from'express';
const transaction = require('../controllers/transaction');

const router = express.Router();

router.get('/transaction', transaction.getTransactions);
router.get('/transaction/:id', transaction.getTransaction);
router.post('/transaction/:account/:type', transaction.debitCredit);
//router.patch('/accounts/:id', transaction);
module.exports = router;