import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export default validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(404).json({ error: "Unauthorized - No access token" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(404).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await UserModel.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in validating token", err);
    res.status(500).json({ error: "Internal Server error" });
  }
};
