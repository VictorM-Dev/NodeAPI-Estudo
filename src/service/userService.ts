import type User from "../model/entities/user.js";
import type UserRepository from "../userRepository.js";

export default class UserService{
  constructor(private userRepository: UserRepository){}
  public CreateUser(user: User) {
    if(!user.getEmail()){
      throw new Error("Email is required");
    }
    if(!user.getPassword()){
      throw new Error("Password is required");
    }
    if(!user.getName()){
      throw new Error("Name is required");
    }
  }
}