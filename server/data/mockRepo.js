import _ from "lodash";

const mockData = {
  categories: [
    { id: 1, name: "Asus" },
    { id: 2, name: "Dell" },
    { id: 3, name: "HP" },
    { id: 4, name: "MSI" },
    { id: 5, name: "Apple" },
    { id: 6, name: "Lenovo" },
  ],
  products: [
    { id: 1, name: "ROG Strix", price: 1000, categoryId: 1 },
    { id: 2, name: "TUF Gaming", price: 950, categoryId: 1 },
    { id: 3, name: "ZenBook", price: 1300, categoryId: 1 },
    { id: 4, name: "XPS 13", price: 1200, categoryId: 2 },
    { id: 5, name: "XPS 15", price: 1500, categoryId: 2 },
    { id: 6, name: "Inspiron 15", price: 800, categoryId: 2 },
    { id: 7, name: "Pavilion", price: 800, categoryId: 3 },
    { id: 8, name: "Spectre x360", price: 1400, categoryId: 3 },
    { id: 9, name: "Omen 16", price: 1600, categoryId: 3 },
    { id: 10, name: "GF63", price: 900, categoryId: 4 },
    { id: 11, name: "Stealth 15", price: 1700, categoryId: 4 },
    { id: 12, name: "Prestige 14", price: 1350, categoryId: 4 },
    { id: 13, name: "MacBook Air M2", price: 1100, categoryId: 5 },
    { id: 14, name: "MacBook Pro 14", price: 2000, categoryId: 5 },
    { id: 15, name: "MacBook Pro 16", price: 2500, categoryId: 5 },
    { id: 16, name: "ThinkPad X1 Carbon", price: 1600, categoryId: 6 },
    { id: 17, name: "Legion 5", price: 1200, categoryId: 6 },
    { id: 18, name: "Yoga 9i", price: 1400, categoryId: 6 },
  ],
};

const db = {
  categories: {
    getAll: () => mockData.categories,
    findById: (id) => mockData.categories.find((item) => item.id == id),
    deleteById: (id) => {
      const item = mockData.categories.find((item) => item.id == id);
      if (item) {
        _.remove(mockData.categories, (item) => item.id == id);
        return id;
      }
      return null;
    },
    create: (input) => {
      const id = mockData.categories.length + 1;
      const item = {
        id: id,
        name: input.name,
      };
      mockData.categories.push(item);
      return item;
    },
    updateById: (id, input) => {
      const index = mockData.categories.findIndex((item) => item.id == id);
      if (index >= 0) {
        Object.keys(input).map((key) => {
          const value = input[key];
          mockData.categories[index][key] = value;
        });
        return mockData.categories[index];
      }
      return null;
    },
  },
  products: {
    getAll: () => mockData.products,
    findById: (id) => mockData.products.find((item) => item.id == id),
    findByCategoryId: (categoryId) =>
      mockData.products.filter((item) => item.categoryId == categoryId),
    deleteById: (id) => {
      const item = mockData.products.find((item) => item.id == id);
      if (item) {
        _.remove(mockData.products, (item) => item.id == id);
        return id;
      }
      return null;
    },
    create: (input) => {
      const id = mockData.products.length + 1;
      const item = {
        id: id,
        name: input.name,
        price: input.price,
        categoryId: input.categoryId,
      };
      mockData.products.push(item);
      return item;
    },
    updateById: (id, input) => {
      const index = mockData.products.findIndex((item) => item.id == id);
      if (index >= 0) {
        Object.keys(input).map((key) => {
          const value = input[key];
          mockData.products[index][key] = value;
        });
        return mockData.products[index];
      }
      return null;
    },
  },
};

export { db };
