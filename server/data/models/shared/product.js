import mongoose from 'mongoose'
let Schema = mongoose.Schema

export const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    collection: 'products',
  },
)
