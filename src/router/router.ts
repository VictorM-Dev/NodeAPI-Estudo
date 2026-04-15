import express from "express";
import UserController from "../controller/userController.js";

export function create(userController: UserController) {
  const router = express.Router();
  router.post("/", (req, res) => userController.createUser(req, res));
  return router;
}

export function find(userController: UserController){
  const router = express.Router();
  router.get("/:id", (req, res) => userController.findById(req, res));
  return router;
}