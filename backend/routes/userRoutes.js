import express from "express";
const router = express.Router();
import { protect } from "../middlewares/jwt.js";
import {
  getAllMyQuizzes,
  getAllQuestionsOfAQuiz,
  getDashboardInfo,
  getSingleQuestion,
  getSingleQuiz,
} from "../controllers/userControllers.js";

router.get("/analytics", protect, getAllMyQuizzes);

// get a single quiz
router.get("/analytics/:questionId", protect, getSingleQuestion);

// get a single quiz
router.get("/analytics/q/:quizId", getSingleQuiz);

// get all question from a single quiz (for question wise analysis)
router.get("/analytics/questionWise/:quizId", getAllQuestionsOfAQuiz);

// get user dashboard info
router.get("/dashboard", protect, getDashboardInfo);

export default router;
