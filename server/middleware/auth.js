import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "testing";

const auth = async (req, res, next) => {
  console.log("Verifying JWT token");
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (isCustomAuth) {
      decodedData = jwt.verify(token, secret); 
      req.userId = decodedData?.id;
      // console.log("Custom Auth", decodedData?.id);
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
