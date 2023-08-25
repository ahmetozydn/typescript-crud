import { Request, Response, NextFunction } from 'express'

const paginationMiddleware = (pageIndex: Number, pageSize: Number = 5) => {
    return (req: Request, res: Response, next: NextFunction) => {

  
      next(); // Call the next middleware
    };
  };