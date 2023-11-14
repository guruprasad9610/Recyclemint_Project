import express from "express";
import { usersLogin, getUsersById, createUsers, getAllUsers, updateUsers, deleteusersById } from "../controller/users.controller.js";

const router = express.Router()


router.post("/login",usersLogin);
router.get("/:id", getUsersById);
router.post("/create",createUsers);
router.get("/", getAllUsers);
router.put("/updateUsers", updateUsers);
router.delete("/delete/:id", deleteusersById);

export default router;