import express from "express";

import { register, login, logout } from "../controllers/auth.js";
import { validateLogin, validateSignup } from "../middleware/validate.js";

const authRoute = express.Router();
authRoute.post("/register", validateSignup, register);
authRoute.post("/login", validateLogin, login);
authRoute.post("/logout", logout);
export default authRoute;
