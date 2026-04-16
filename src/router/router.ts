import express from "express";
import UserController from "../controller/userController.js";

export function create(userController: UserController) {
  const router = express.Router();
  router.post("/create", (req, res) => userController.createUser(req, res));
  router.get("/search/:id", (req, res) => userController.findById(req, res));
  router.get("/all", (req, res) => userController.findAll(req, res));
  router.delete("/delete/:id", (req, res) => userController.deleteByID(req, res));
  return router;
}