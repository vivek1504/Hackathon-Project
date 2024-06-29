import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { apiRouter } from "./routes/MealPlanner";
const app = express();

app.use(cors())
app.use(express.json());
app.use("/user", userRouter);
app.use("/api", apiRouter)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
