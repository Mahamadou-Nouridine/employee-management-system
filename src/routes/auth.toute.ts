import { Router } from "express";
import { generateToken } from "../controllers/auth.controller";
import { param } from "express-validator";

const authRouter = Router();

authRouter.route("/generate-token/:role").get(
  param("role")
    .isString()
    .notEmpty()
    // sanitize the input
    .escape(),
  generateToken
);

export default authRouter;
