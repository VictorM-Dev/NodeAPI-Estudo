class AppError extends Error{
  constructor(message: string, public status: number, public type: string){
    super(message);
  }
}

export class ArgumentRequired extends AppError{
  constructor(message: string){
    super(message, 400, "bad-request");
  }
}

export class UserNotFound extends AppError{
  constructor(message: string){
    super(message, 404, "not-found");
  }
}