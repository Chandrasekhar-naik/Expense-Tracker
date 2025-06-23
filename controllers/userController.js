const userModel = require("../models/userModels.js");
const loginController = async (req, res) => {
  try {
    //compare values with database
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //user found
    res.status(200).json({success:true,user});
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newuser = new userModel(req.body);
    await newuser.save();
    res.status(201).json({
      success: true,
      user:newuser,
    });    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
