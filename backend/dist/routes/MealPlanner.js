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
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddlware_1 = require("../middlewares/authMiddlware");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
exports.apiRouter = express_1.default.Router();
var Goal;
(function (Goal) {
    Goal[Goal["LOSE_WEIGHT"] = 0] = "LOSE_WEIGHT";
    Goal[Goal["GAIN_WEIGHT"] = 1] = "GAIN_WEIGHT";
    Goal[Goal["MAINTAIN_WEIGHT"] = 2] = "MAINTAIN_WEIGHT";
})(Goal || (Goal = {}));
function calculateCalories(weight, height, age, gender, HealthGoal) {
    if (!["MALE", "FEMALE"].includes(gender.toUpperCase())) {
        throw new Error("Invalid gender. Please enter 'MALE' or 'FEMALE'.");
    }
    let bmr;
    if (gender.toUpperCase() === "MALE") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityFactors = {
        LOSE_WEIGHT: 1.2,
        MAINTAIN_WEIGHT: 1.5,
        GAIN_WEIGHT: 1.8,
    };
    const calories = bmr * (activityFactors[HealthGoal] || 1.5);
    return calories;
}
exports.apiRouter.post('/mealplanner', authMiddlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timeFrame = req.body.timeFrame;
    const user = req.body.user;
    const userDetails = yield prisma.userProfiles.findUnique({
        where: {
            userId: user.id
        }
    });
    const weight = userDetails === null || userDetails === void 0 ? void 0 : userDetails.weight;
    const height = userDetails === null || userDetails === void 0 ? void 0 : userDetails.height;
    const age = userDetails === null || userDetails === void 0 ? void 0 : userDetails.age;
    const gender = userDetails === null || userDetails === void 0 ? void 0 : userDetails.gender;
    const HealthGoal = userDetails === null || userDetails === void 0 ? void 0 : userDetails.healthGoal;
    if (weight === undefined || height === undefined || age === undefined || gender === undefined || HealthGoal === undefined) {
        res.status(400).json({ message: "Incomplete Profile" });
        return;
    }
    const calories = calculateCalories(weight, height, age, gender, HealthGoal);
    const diet = userDetails === null || userDetails === void 0 ? void 0 : userDetails.dietryPreferences;
    const exclude = userDetails === null || userDetails === void 0 ? void 0 : userDetails.allergies.toString();
    const plan = yield axios_1.default.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.API_KEY}&timeFrame=${timeFrame}&diet=${diet}&exclude=${exclude}&targetCalories=${calories}`);
    if (!plan) {
        res.status(400).json({ message: "Invalid request body" });
    }
    res.json(plan.data);
}));
