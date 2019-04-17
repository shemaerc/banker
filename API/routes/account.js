import express from 'express';
import Account from '../my_functions/account';
const router = express.Router();
router.get('/accounts', Account.getAccounts);
router.get('/accounts/:accn', Account.getAccount);
router.post('/accounts', Account.createAccount);
router.patch('/accounts/edit/:id', Account.updateAccount);
router.patch('/accounts/:accNumber',Account.activeDeactive);
router.delete('/accounts/:accNo',Account.accountDelete)
// export default router;
module.exports = router;