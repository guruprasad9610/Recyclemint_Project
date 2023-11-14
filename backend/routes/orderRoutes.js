import express from "express";
import { createOrder, cancelOrder, confOrder, assOrder, pConAgent, payConfAgent, orderHist, orderHistById, filterOrder } from "../controller/order.controller.js";

const router = express.Router()


router.post("/createOrder", createOrder);
router.put("/:orderid", cancelOrder);
router.put("/conforder/:orderid", confOrder);
router.put("/assorder/:orderid", assOrder);
router.put("/coforderbyagent/:agentid", pConAgent);
router.put("/payconfbyagent/:agentid", payConfAgent);
router.get("/filtorder/:agentid", filterOrder);
router.get("/historder/:custid", orderHist);
router.get("/indhistorder/:orderid", orderHistById);


export default router;