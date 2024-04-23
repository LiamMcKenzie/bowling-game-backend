import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLeaderboardEntry = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.leaderboard.create({
        data: { ...req.body },
      });
  
      const newEntries = await prisma.leaderboard.findMany();
  
      return res.status(201).json({
        msg: "Leaderboard entry successfully created",
        data: newEntries,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const getLeaderboard = async (req, res) => {
    try {
      const leaderboard = await prisma.leaderboard.findMany();
  
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
      const entry = await prisma.leaderboard.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!entry) {
        return res
          .status(404)
          .json({ msg: `No leaderboard entry with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: entry,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const updateLeaderboardEntry = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let entry = await prisma.leaderboard.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!entry) {
        return res
          .status(404)
          .json({ msg: `No leaderboard entry with the id: ${req.params.id} found` });
      }
  
      entry = await prisma.leaderboard.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Leaderboard entry with the id: ${req.params.id} successfully updated`,
        data: entry,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const deleteLeaderboardEntry = async (req, res) => {
    try {
      const entry = await prisma.leaderboard.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!entry) {
        return res
          .status(404)
          .json({ msg: `No leaderboard entry with the id: ${req.params.id} found` });
      }
  
      await prisma.leaderboard.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Leaderboard entry with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

export {
    createLeaderboardEntry,
    getLeaderboard,
    getLeaderboardEntry,
    updateLeaderboardEntry,
    deleteLeaderboardEntry,
};
