import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateJwtAndSendCookies from "../utils/generateJwtAndSendCookies.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const check = await bcrypt.compare(password, user.password || "");
    if (!check) {
      return res.status(400).json({ error: "Username already exists" });
    }

    generateJwtAndSendCookies(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerController = async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedpassword,
      gender,
      profilePic: gender == "Male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      await newUser.save();
      generateJwtAndSendCookies(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutController = async(req, res) => {
  try{
    res.cookie("accessToken",null,{
      maxAge:0
    });
    res.status(200).json({message:"Logged out successfully"});
  }
  catch(err){
    console.log("Error in logout controller",err.message);
    res.status(500).json({message:"Internal Error"});
  }
};
