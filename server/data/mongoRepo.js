import { Category, Product } from "./models/shared/index.js";

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find().populate("products");
      return items;
    },
    findById: async (id) => await Category.findById(id).populate("products"),
    deleteById: async (id) => {
      const result = await Category.findByIdAndDelete(id);
      return result != null;
    },
    create: async ({ name }) => {
      const created = await Category.create({
        name: name,
      });
      return created;
    },
    updateById: async (id, { name }) => {
      const result = await Category.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      return result;
    },
  },
  products: {
    getAll: async () => {
      const items = await Product.find().populate("categoryId");
      return items;
    },
    findById: async (id) => await Product.findById(id).populate("categoryId"),
    findByCategoryId: async (categoryId) => {
      return await Product.find({ categoryId }).populate("categoryId");
    },
    deleteById: async (id) => {
      const result = await Product.findByIdAndDelete(id);
      return result != null;
    },
    create: async ({ name, price, categoryId }) => {
      const created = await Product.create({
        name,
        price,
        categoryId,
      });
      return created;
    },
    updateById: async (id, { name, price, categoryId }) => {
      const result = await Product.findOneAndUpdate(
        { _id: id },
        { name, price, categoryId },
        { new: true }
      ).populate("categoryId");
      return result;
    },
  },
};

export { db };
