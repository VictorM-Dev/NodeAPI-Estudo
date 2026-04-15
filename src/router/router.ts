import express from "express";
import UserController from "../controller/userController.js";

export function create(userController: UserController) {
  const router = express.Router();
  router.post("/create", (req, res) => userController.createUser(req, res));
  router.get("/search:id", (req, res) => userController.findById(req, res));
  return router;
}