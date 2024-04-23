import express from "express";
import {
    createLeaderboardEntry,
    getLeaderboard,
    getLeaderboardEntry,
    updateLeaderboardEntry,
    deleteLeaderboardEntry,
} from "../controllers/leaderboard.js";

const router = express.Router();

router.post("/", createLeaderboardEntry);
router.get("/", getLeaderboard);
router.get("/:id", getLeaderboardEntry);
router.put("/:id", updateLeaderboardEntry);
router.delete("/:id", deleteLeaderboardEntry);

export default router;
