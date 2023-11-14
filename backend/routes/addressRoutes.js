import express from "express";
import { addAddress, getAddressById, getAddressByCusId, updateAddressById, deleteAddress} from "../controller/address.controller.js";

const router = express.Router()

router.post("/create", addAddress);
router.get("/:id", getAddressById);
router.get("/cusId/:cusId", getAddressByCusId);
router.put("/update", updateAddressById);
router.delete("/delete/:id", deleteAddress);


export default router;