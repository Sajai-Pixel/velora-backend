import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.post("/add", upload.array("images", 4), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', upload.array("images", 4), updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;