import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUser = [
    check("name").isString().isLength({min:1}).withMessage("name is required"),
    check("email").isEmail().withMessage("email is required"),
    check("password").isString().isLength({min:5}).withMessage("password should be of min size 5"),
    (req:Request ,res :Response, next:NextFunction)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({error:errors})
        }
        next();
    }
]

