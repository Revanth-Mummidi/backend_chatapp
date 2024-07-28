import jwt from "jsonwebtoken";

const generateJwtAndSendCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "20d",
  });
  res.cookie("accessToken", token, {
    httpOnly: true, // prevents from XSS attacks cross-site scripting attacks
    maxAge: 20 * 24 * 60 * 60 * 1000,
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: (process.env.NODE_ENV == "development") ? false : true,
  });
};

export default generateJwtAndSendCookies;
