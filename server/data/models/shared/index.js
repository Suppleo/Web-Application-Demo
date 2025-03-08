import mongoose from "mongoose";

import { CategorySchema } from "./category.js";
import { ProductSchema } from "./product.js";

export const Category = mongoose.model("Category", CategorySchema);
export const Product = mongoose.model("Product", ProductSchema);
