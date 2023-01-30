import express from "express";
import { getIzin, getIzinById, createIzin, updateIzin, deleteIzin } from "../controllers/Izin.js";
import { verifyUser } from "../middleware/AuthUser.js"; //agar hanya bisa diakses oleh user yang telah login

const router = express.Router();

router.get("/izin", verifyUser, getIzin);
router.get("/izin/:id", verifyUser, getIzinById);
router.post("/izin", verifyUser, createIzin);
router.patch("/izin/:id", verifyUser, updateIzin);
router.delete("/izin/:id", verifyUser, deleteIzin);

export default router;
