import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifytoken=(req: Request,res : Response,next : NextFunction)=>{

    if (req.headers.authorization!==undefined){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,"mysecret",(err,data)=>{
            if (!err){
                next()
            }
            else{
                res.status(403).json({message:"please send the correct token"})
            }
        })
    }
    else{
        res.status(401).json({message:"please send token"})
    }
};

