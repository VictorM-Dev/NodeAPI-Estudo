import express from "express";
import UserController from "../controller/userController.js";
const router = express.Router();

export function userRouter(userController: UserController) {
  router.post("/", (req, res) => userController.createUser(req, res));
  return router;
}