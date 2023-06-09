import express from "express";
// import {   userid } from "../models/user.js";
import {  getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/auth.js";
const router = express.Router();

// router.get("/all",getAllUsers);
router.post("/new",register);
router.post("/login",login);

// router.get("/userid/:id",userid);
// router.put("/userid/:id",update);
// router.delete("/userid/:id",deleted);

router.get("/me",isAuthenticate,getMyProfile);
router.get("/logout",logout);

export default router;