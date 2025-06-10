import express from "express";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controller/product.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/get").get(isAuthenticated,getAllProducts) 
router.route("/add").post(isAuthenticated,addProduct); 
router.route("/get/:id").get(isAuthenticated,getSingleProduct);
router.route("/update/:id").put(isAuthenticated,updateProduct);
router.route("/delete/:id").delete(isAuthenticated,deleteProduct);


export default router;
