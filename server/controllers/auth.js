import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createError } from "../middleware/error.js";
import { validationResult } from "express-validator";

// Create Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

// Register User
export const register = async (req, res, next) => {
  console.log("call register controller");
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0].msg);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      cart: { items: [] },
      password: hash,
    });

    const result = await newUser.save();
    res.status(201).json({
      message: "User has been created !",
      userId: result._id,
    });
  } catch (err) {
    console.log(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    // check email exists
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0].msg);
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));
    const { password, ...otherDetails } = req.user._doc;
    // create token
    const accessToken = generateAccessToken({ ...otherDetails });
    // response client
    res.status(200).json({ accessToken, details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
