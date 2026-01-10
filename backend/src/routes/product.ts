import { Router, Request, Response } from "express";
import { getProducts, createProduct } from "../controllers/product";

const router = Router();
router.get("/", getProducts);
router.post("/", createProduct);

export default router;