import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateLeaderboard = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                score: 'desc' // Order users by score in descending order
            },
        });

        const leaderboard = users.map((user, index) => ({
            rank: index + 1, // Rank starts from 1
            userId: user.id,
            username: user.username,
            score: user.score,
        }));

        return leaderboard;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await generateLeaderboard();

        if (leaderboard.length === 0) {
            return res.status(404).json({ msg: "Leaderboard is empty" });
        }

        return res.json({ data: leaderboard });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const getLeaderboardEntry = async (req, res) => {
    try {
        const leaderboard = await generateLeaderboard();
        const entryId = Number(req.params.id);

        if (entryId <= 0 || entryId > leaderboard.length) {
            return res.status(404).json({ msg: "Leaderboard entry not found" });
        }

        const entry = leaderboard[entryId - 1]; // Subtract 1 to match array index

        return res.json({
            data: entry,
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

export {
    getLeaderboard,
    getLeaderboardEntry,
};
