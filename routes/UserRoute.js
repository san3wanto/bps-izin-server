import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser, updateUserStatus } from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUser);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// router.get("/users", verifyUser, getUser);
// router.get("/users/:id", verifyUser, getUserById);
// router.post("/users", verifyUser, adminOnly, createUser);
// router.patch("/users/:id", verifyUser, updateUser);
// router.patch("/users/:id/status", verifyUser, updateUserStatus);
// router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;
