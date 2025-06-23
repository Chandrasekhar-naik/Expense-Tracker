const express = require('express');
const { addTransactions, getAllTransactions, editTransactions, deleteTransactions } = require('../controllers/transactionController');
//router object
const router = express.Router();

router.post('/add-transaction',addTransactions);

router.post('/edit-transaction',editTransactions);

router.post('/delete-transaction',deleteTransactions);

router.post('/get-transaction',getAllTransactions)


module.exports = router;