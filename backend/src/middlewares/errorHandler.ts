import { Response, Request, NextFunction } from 'express';

interface ICustomError extends Error{
  statusCode?: number;
}

export const errorHandler = (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка на сервере' : err.message;
  res.status(statusCode).send({ message });
};

export default errorHandler;
