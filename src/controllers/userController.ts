import { Request,Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"



//working fine
export const registerUser = async(req: Request, res:Response)=>{
    const {name,email,password}= req.body
    try {
        const user = await User.findOne({where : {email:email}})
        if (user){
            return res.status(403).json({message:"user already exists"})
        }
        const hashedpass = await bcrypt.hash(password,10);
        const data = await User.create({name,email,password:hashedpass})
        res.json({message:"user created "})
    } catch (error) {
        res.status(500).json({error:"failed to register user"})
    }
}

//working fine
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'wrong password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email },"mysecret");
        res.json({ message:"user logged in", token:token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};

//WORKING FINE
export const getusers = async (req:Request, res:Response)=>{
    try {
        const data  = await User.findAll(); 
        if (data.length===0){
            res.status(404).json({message:"currently no users"})
        }
        else{
            res.json(data)
        }
    } catch (error) {
        res.status(500).json({error:"failed to get user"})
    }
}

//WORKING FINE
export const getuserbyemail= async(req:Request,res:Response)=>{
    const email = req.params.email
    try { 
        const user = await User.findOne({where:{email:email}})
        if (user){
            res.json(user)
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).json({error:"failed to get user"})
    }
}


//working fine
export const updateUserByEmail = async (req:Request,res:Response)=>{
    const oldemail = req.params.email
    const {name , email, password} = req.body

    try {
        const user = await User.findOne({where:{email:oldemail}})
        if (user){
            user.name = name;
            user.email = email
            const newpass = await bcrypt.hash(password,10)
            user.password = newpass;
            await user.save();
            res.json(user)
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).json({error:"failed to update user"})
    }
}


//WORKING FINE
export const deleteUserByEmail = async (req: Request, res:Response)=>{
    const oldemail = req.params.email
    try {
        const user = await User.findOne({where:{email:oldemail}})
        if (!user){
            res.status(404).json({message:"user doesn't exist"})
        }
        else{
            await user.destroy();
            res.status(404).json({message:"user deleted"})
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({error:"failed to delete user"})
    }
}