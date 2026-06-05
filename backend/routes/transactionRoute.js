const express = require('express');
const { addTransactions, getAllTransactions, editTransactions, deleteTransactions } = require('../controllers/transactionController');
const authMiddleware = require("../middlewares/authMiddleware");
//router object
const router = express.Router();

router.post("/add-transaction", authMiddleware, addTransactions);
router.post("/edit-transaction", authMiddleware, editTransactions);
router.post("/delete-transaction", authMiddleware, deleteTransactions);
router.post("/get-transaction", authMiddleware, getAllTransactions);



module.exports = router;