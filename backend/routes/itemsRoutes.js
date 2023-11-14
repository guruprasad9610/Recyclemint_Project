import express from "express";
import { addItems, getAllItems, getItemsById, updateItems, deleteItemsById } from "../controller/items.controller.js";

const router = express.Router()


router.post("/create",addItems);
router.get("/", getAllItems);
router.get("/:id", getItemsById);
router.put("/update",updateItems);
router.delete("/delete/:id",deleteItemsById);

export default router;
