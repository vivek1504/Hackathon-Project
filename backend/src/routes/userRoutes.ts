import express from "express";
import { PrismaClient } from "@prisma/client";
import { loginSchema, signupSchema } from "../zod";
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middlewares/authMiddlware";

export const userRouter = express.Router();

userRouter.post("/signup", async(req, res) => {
    const prisma = new PrismaClient();

    const body = req.body;
    const {success} = signupSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({message: "Invalid request body"});
    }

    try{
        const response = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                role : body.role
            }
        });

        const token = jwt.sign(response, process.env.JWT_SECRET!);
        return res.status(201).json({token});
    }
    catch (error) {
        return res.status(400).json({message: "User already exists"});
    }
});

userRouter.post("/signin",async(req,res)=>{
    const prisma = new PrismaClient();

    const body =await req.body;
    const {success} = loginSchema.safeParse(body)

    if (!success) {
        return res.status(400).json({message: "Invalid request body"});
    }
    try{
        const response =await prisma.user.findUnique({
            where : {
                email : body.email,
                password : body.password
            }
        })

        if (response == null) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(response, process.env.JWT_SECRET!);
        
        return res.status(200).json({token});
    }

    catch (error) {
        return res.status(400).json({message: "Invalid email or password"});
    }
})

userRouter.post("/addProfile",authMiddleware,async(req,res)=>{
    const prisma = new PrismaClient();
    const body = req.body;
    const user = req.body.user;

    try{
        const response =await prisma.userProfiles.create({
            data :{
                userId : user.id,
                age : body.age,
                gender : body.gender,
                weight : body.weight,
                height : body.height,
                dietryPreferences :body.dietryPreferences,
                allergies : body.allergies,
                healthGoal : body.healthGoal
            }
        })

        return res.status(201).json({message : "Profile added successfully"})
    }
    catch(error){
        return res.status(400).json({message: "Request failed"});
    }
})

userRouter.put("/updateProfile",authMiddleware,async(req,res)=>{
    const prisma = new PrismaClient();
    const body = req.body;
    const user = req.body.user;

    try{
        const response =await prisma.userProfiles.update({
            where : {
                userId : user.id
            },
            data : body
        })

        return res.status(200).json({message : "Profile updated successfully"})

    }
    catch(error){
        return res.status(400).json({message: "Request failed"});
    }
})