import type { UUID } from "node:crypto";

export default class ReturnUserDTO{
  constructor(public id: UUID, public name: string, public email: string){} 
}