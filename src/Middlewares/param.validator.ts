import { NextFunction, Response, Request, } from "express";
import { TYPES, SORT_OPT } from "../DI/types" // used in inversify
import { Post } from "../Models/posts";

/*   declare module 'express' {
    interface Request {
        sortType: string;
        pageIndex: number;
    }
} */

declare global {
    namespace Express {
      interface Request {
        pageIndex: number,
        sortType: string,
        orderBy: 1 | -1,
        filter:  {
            likes: {
                $gte: number;
                $lte: number;
            };
        }
      }
    }
  }

export const pageIndexChecker =  async (req:Request,res:Response,next:NextFunction)=>{
    console.log("inside pageIndexChecker")
    let param = Number(req.query.pi) // what if undefined?

    if(param && typeof param == 'number'){
        console.log("the page index parametre is valid.")
        const total =  await Post.countDocuments();
        if(param < 1 || param > total){
            param = 1
        }
         req.pageIndex = param
    }
    next();
}
export const  sortParamChecker = async (req: Request, res: Response, next:NextFunction) =>  {
    console.log("inside sortParamChecker")
    const sortParam = req.query.sort;
    const isValid = isValidSortOption(sortParam)
    if( sortParam && typeof sortParam === 'string' && isValid ){
        req.sortType = sortParam;
        console.log("the sort parametre is valid.");
    }
    next();
}

export const orderByParamChecker =  async (req:Request,res:Response,next:NextFunction)=>{
    console.log("inside orderby")
        const sortOrder = req.query.orderby === 'desc' ? -1 : 1;



    if(sortOrder){
        console.log("orderby is valid.")
         req.orderBy = sortOrder
    }
    next();
}

export const filterChecker =  async (req:Request,res:Response,next:NextFunction)=>{
    console.log("inside orderby")
    const expression = req.query.filter as string; 

    if(expression){
        console.log("expression exist")
        const numbers = expression.match(/\d+/g);
        if(numbers !== null){
            console.log("number exist")
            const [minLikes, maxLikes] = numbers;
            console.log(minLikes, maxLikes);
            const filter = {
                likes: { $gte: parseInt(minLikes), $lte: parseInt(maxLikes) }
            };
            req.filter = filter
        }
    }
    next();
}

function isValidSortOption(value: any): value is SORT_OPT {
    return Object.values(SORT_OPT).includes(value);
}


