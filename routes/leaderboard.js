import express from "express";
import {
    getLeaderboard,
    getLeaderboardEntry,
} from "../controllers/leaderboard.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.get("/:id", getLeaderboardEntry);

export default router;
