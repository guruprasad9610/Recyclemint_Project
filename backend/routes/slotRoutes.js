import express from "express";
import { createSlot, allSlot } from "../controller/slot.controller.js";

const router = express.Router()


router.post("/createSlot", createSlot);
router.get("/allSlot", allSlot);


export default router;