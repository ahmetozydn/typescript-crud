import { Express, Request, Response} from 'express';

export const pageNotFound = (req: Request, res: Response) =>{
    res.status(404).json({ message: 'Page not found' });
}