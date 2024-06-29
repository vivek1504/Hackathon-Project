import express from 'express';
import { authMiddleware } from '../middlewares/authMiddlware';
import { Prisma, PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export const apiRouter = express.Router();

enum Goal {
    LOSE_WEIGHT,
    GAIN_WEIGHT,
    MAINTAIN_WEIGHT
  }

function calculateCalories(weight :number, height : number, age : number, gender : "MALE" |"FEMALE", HealthGoal : Goal) {

  if (!["MALE", "FEMALE"].includes(gender.toUpperCase())) {
    throw new Error("Invalid gender. Please enter 'MALE' or 'FEMALE'.");
  }

let bmr;
if (gender.toUpperCase() === "MALE") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
} else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
}

const activityFactors: { [key: string]: number } = {
    LOSE_WEIGHT: 1.2,
    MAINTAIN_WEIGHT: 1.5,
    GAIN_WEIGHT: 1.8,
};

const calories = bmr * (activityFactors[HealthGoal] || 1.5);

  return calories;
}

apiRouter.post('/mealplanner',authMiddleware, async (req, res) => {
    const timeFrame = req.body.timeFrame;
    const user = req.body.user;

    const userDetails = await prisma.userProfiles.findUnique({
        where: {
            userId: user.id
        }
    });
    
    const weight = userDetails?.weight;
    const height = userDetails?.height;
    const age = userDetails?.age;
    const gender = userDetails?.gender;
    const HealthGoal = userDetails?.healthGoal;

    if (weight === undefined || height === undefined || age === undefined || gender === undefined || HealthGoal === undefined) {
      res.status(400).json({ message: "Incomplete Profile" });
      return;
    }

    const calories = calculateCalories(weight, height, age, gender, HealthGoal as unknown as Goal);
    const diet = userDetails?.dietryPreferences;
    const exclude = userDetails?.allergies.toString();

    const plan = await axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.API_KEY}&timeFrame=${timeFrame}&diet=${diet}&exclude=${exclude}&targetCalories=${calories}`);

    if (!plan) {
      res.status(400).json({ message: "Invalid request body" });
    }
    res.json(plan.data);

});