import type User from "../model/entities/user.js";
import type UserUpdateDTO from "../model/DTO/userUpdateDTO.js";
import UserRepository from "../repository/userRepository.js";
import * as AppError from "../model/error/appError.js";
import type { UUID } from "node:crypto";

export default class UserService {
  constructor(private userRepository: UserRepository) {}
  public createUser(user: User) {
    if (!user.getEmail()) {
      throw new AppError.ArgumentRequired("Email is required");
    }
    if (!user.getPassword()) {
      throw new AppError.ArgumentRequired("Password is required");
    }
    if (!user.getName()) {
      throw new AppError.ArgumentRequired("Name is required");
    }

    return this.userRepository.saveUser(user);
  }
  public getUserById(id: UUID) {
    const dataUser = this.userRepository.findUserById(id);
    if (!dataUser) {
      throw new AppError.UserNotFound("User not found");
    }
    return dataUser;
  }
  public getAllUsers() {
    return this.userRepository.findAll();
  }
  public removeUser(id: UUID) {
    if (this.userRepository.delete(id) === null) {
      throw new AppError.UserNotFound("User not found");
    }
  }
}
