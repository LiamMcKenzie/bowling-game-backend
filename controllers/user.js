import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.user.create({
        data: { ...req.body },
      });
  
      const newUser = await prisma.user.findMany();
  
      return res.status(201).json({
        msg: "User successfully created",
        data: newUser,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
  
      if (users.length === 0) {
        return res.status(404).json({ msg: "No users found" });
      }
  
      return res.json({ data: users });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const getUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No user with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const updateUser = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No user with the id: ${req.params.id} found` });
      }
  
      user = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `User with the id: ${req.params.id} successfully updated`,
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const deleteUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No user with the id: ${req.params.id} found` });
      }
  
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `User with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
