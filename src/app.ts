import express from "express";

import UserController from "./controller/userController.js";
import UserRepository from "./repository/userRepository.js";
import UserService from "./service/userService.js";
import * as router from "./router/router.js";

import { erroMiddleware } from "./middleware/erroMiddleware.js";

const app = express();
const userRepository = new UserRepository([]);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use(express.json());

app.use("/user", router.create(userController));

app.use(erroMiddleware);

app.listen(3000, () => {
  console.log("Server on: http://localhost:3000");
});