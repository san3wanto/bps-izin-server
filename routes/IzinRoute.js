import express from "express";
import { getIzin, getIzinById, createIzin, updateIzin, deleteIzin, finsihIzin } from "../controllers/Izin.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js"; //agar hanya bisa diakses oleh user yang telah login
// import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; //agar hanya bisa diakses oleh user yang telah login

const router = express.Router();

// router.get("/izin", verifyUser, adminOnly, getIzin);
router.get("/izin", verifyUser, getIzin);
router.get("/izin/:id", verifyUser, getIzinById);
router.post("/izin", verifyUser, createIzin);
router.patch("/izin/:id", verifyUser, updateIzin);
router.patch("/izin/:id/finish", verifyUser, finsihIzin);
router.delete("/izin/:id", verifyUser, adminOnly, deleteIzin);

export default router;
