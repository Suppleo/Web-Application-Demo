export const typeDef = `
    type Product {
        id: Int!
        name: String!
        price: Int!
        category: Category!
    }

    input ProductInput {
        name: String!
        price: Int!
        categoryId: Int!
    }

    extend type Query {
        products: [Product]
        product(id: Int!): Product
    }

    extend type Mutation {
        deleteProduct(id: Int!): Int
        createProduct(input: ProductInput!): Product
        updateProduct(id: Int!, input: ProductInput!): Product
    }
`;

export const resolvers = {
  Query: {
    products: (parent, args, context, info) => {
      return context.db.products.getAll();
    },
    product: (parent, args, context, info) => {
      return context.db.products.findById(args.id);
    },
  },
  Mutation: {
    deleteProduct: (parent, args, context, info) => {
      return context.db.products.deleteById(args.id);
    },
    createProduct: (parent, args, context, info) => {
      return context.db.products.create(args.input);
    },
    updateProduct: (parent, args, context, info) => {
      return context.db.products.updateById(args.id, args.input);
    },
  },
  Product: {
    category: (parent, args, context, info) => {
      return context.db.categories.findById(parent.categoryId);
    },
  },
};
