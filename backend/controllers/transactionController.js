const moment = require("moment");
const mongoose = require("mongoose");
const transactionModel = require("../models/transactionModel");

const addTransactions = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please check your MongoDB configuration.",
      });
    }

    const { amount, type, category, description, date, refrence } = req.body;
    const userid = req.user?.userId;

    if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
      return res
        .status(400)
        .json({ success: false, message: "A valid user ID is required" });
    }

    if (!amount || !type || !category || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "Amount, type, category, description and date are required",
      });
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid number greater than 0",
      });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid value",
      });
    }

    const transaction = await transactionModel.create({
      userid,
      amount: parsedAmount,
      type,
      category,
      description,
      date: parsedDate,
      refrence,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const userid = req.user?.userId;
    if (!userid) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing" });
    }
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: { $gt: moment().subtract(Number(frequency), "d").toDate() },
            userid,
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const editTransactions = async (req, res) => {
  try {
    const userid = req.user?.userId;
    const transaction = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId, userid },
      { ...req.body.payload, userid },
      { new: true }
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).send("edited successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const userid = req.user?.userId;
    const transaction = await transactionModel.findOneAndDelete({
      _id: req.body.transactionId,
      userid,
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).send("transaction deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllTransactions, addTransactions, editTransactions, deleteTransactions };
