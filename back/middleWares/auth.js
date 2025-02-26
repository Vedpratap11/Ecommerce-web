import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import "dotenv/config";

export async function check(req, res, next) {
  //   console.log(req);
  //   console.log("cookies", req.cookies);

  const token = req.cookies.loginToken;
  if (!token) return res.status(401).send({ message: "No Token Found" });

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user by id
  const user = await User.findById(decoded.id).select("-password");

  //USER NOT FOUND
  if (!user) {
    return res.status(401).json({ message: "USER NOT FOUND" });
  }

  req.user = user;
  next();
}