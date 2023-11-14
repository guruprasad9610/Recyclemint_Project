import express from "express";
import { addLocation, getAllLocation, getLocationById, updateLocation, deleteLocation, validatePIN, compareLocation } from "../controller/location.controller.js";

const router = express.Router()


router.post("/create",addLocation);
router.get("/", getAllLocation);
router.get("/:id", getLocationById);
router.put("/update",updateLocation);
router.delete("/delete/:id",deleteLocation);
router.get("/validatePIN/:PIN", validatePIN);
router.post("/compare/:PIN", compareLocation)

export default router;
