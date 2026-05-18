const moment = require("moment");
const transactionModel = require("../models/transactionModel");

const addTransactions = async (req, res) => {
  try {
    const transaction = new transactionModel(req.body);
    transaction.save();
    res.status(201).send("transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const { userid } = req.body;
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
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const editTransactions = async(req,res)=>{
  try {
    await transactionModel.findByIdAndUpdate({_id:req.body.transactionId},req.body.payload);
    res.status(200).send("edited successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error})
  }
}

const deleteTransactions = async(req,res)=>{
  try {
    await transactionModel.findByIdAndDelete({_id:req.body.transactionId});
    res.status(200).send("transaction deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error})
  }
}

module.exports = { getAllTransactions, addTransactions, editTransactions, deleteTransactions };
