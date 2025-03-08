import mongoose from "mongoose";
let Schema = mongoose.Schema;

export const CategorySchema = new Schema(
  {
    name: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    collection: "categories",
  }
);
