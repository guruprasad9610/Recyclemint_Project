import express from "express";
import { login, verifyOTP, getCustomersByPhone, updateProfile, getAllCustomers, deletecustomerById } from "../controller/customer.controller.js";

const router = express.Router()


router.post("/login",login);
router.post("/verifyOTP",verifyOTP);
router.get("/:phone", getCustomersByPhone);
router.put("/updateProfile",updateProfile);
router.get("/", getAllCustomers);
router.delete("/delete/:id", deletecustomerById);

export default router;