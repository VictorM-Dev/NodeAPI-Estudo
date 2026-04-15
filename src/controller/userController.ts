import User from "../model/entities/user.js";
import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import UserService from "../service/userService.js";
import ReturnUserDTO from "../model/DTO/returnUserDTO.js";

export default class UserController {
  constructor(private userService: UserService) {}
  createUser(req: Request, res: Response) {
    const dataUser = req.body;
    const user = new User(
      dataUser.name,
      dataUser.email,
      dataUser.password,
      randomUUID(),
    );
    const userCreate = this.userService.createUser(user);
    if (userCreate) {
      const dataUserDTO = new ReturnUserDTO(
        userCreate.getId(),
        userCreate.getName(),
        userCreate.getEmail(),
      );
      res.status(201).json(dataUserDTO);
    }
  }
}
