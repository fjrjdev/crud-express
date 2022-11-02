class AppError extends Error {
  statuscode: number;
  constructor(message: string, number: number = 400) {
    super();
    this.message = message;
    this.statuscode = number;
  }
}

export default AppError;
