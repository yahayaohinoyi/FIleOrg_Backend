import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';

const headerMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default headerMiddleware;
