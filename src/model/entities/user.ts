import type { UUID } from "node:crypto";

export default class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private readonly id: UUID,
  ) {}

  public getId(): UUID {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }
}
