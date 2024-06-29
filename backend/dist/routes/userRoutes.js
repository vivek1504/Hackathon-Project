"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("../zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddlware_1 = require("../middlewares/authMiddlware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const body = req.body;
    const { success } = zod_1.signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    try {
        const response = yield prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                role: body.role
            }
        });
        const token = jsonwebtoken_1.default.sign(response, process.env.JWT_SECRET);
        return res.status(201).json({ token });
    }
    catch (error) {
        return res.status(400).json({ message: "User already exists" });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const body = yield req.body;
    const { success } = zod_1.loginSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    try {
        const response = yield prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (response == null) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign(response, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
}));
exports.userRouter.post("/addProfile", authMiddlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const body = req.body;
    const user = req.body.user;
    try {
        const response = yield prisma.userProfiles.create({
            data: {
                userId: user.id,
                age: body.age,
                gender: body.gender,
                weight: body.weight,
                height: body.height,
                dietryPreferences: body.dietryPreferences,
                allergies: body.allergies,
                healthGoal: body.healthGoal
            }
        });
        return res.status(201).json({ message: "Profile added successfully" });
    }
    catch (error) {
        return res.status(400).json({ message: "Request failed" });
    }
}));
exports.userRouter.put("/updateProfile", authMiddlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const body = req.body;
    const user = req.body.user;
    try {
        const response = yield prisma.userProfiles.update({
            where: {
                userId: user.id
            },
            data: body
        });
        return res.status(200).json({ message: "Profile updated successfully" });
    }
    catch (error) {
        return res.status(400).json({ message: "Request failed" });
    }
}));
