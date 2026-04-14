import User from "./model/entities/user.js";
import type { UUID } from "node:crypto";

export default class UserRepository{
  constructor(private repository: User[]){}

  public saveUser(userData: User){
    this.repository.push(userData);
  }

  public findUserById(id: UUID){
    const dataUser = this.repository.find(u => u.getId() === id);
    return dataUser;
  }

  public findAll(){
    return this.repository;
  }

  public delete(id: UUID){
    const dataIndex = this.repository.findIndex(u => u.getId() === id);
    if(dataIndex === -1) return null;
    this.repository.splice(dataIndex, 1);
  }
}