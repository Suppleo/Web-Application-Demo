export const typeDef = `
    type Product {
        _id: ID!
        name: String!
        price: Int!
        category: Category!
    }

    input ProductInput {
        name: String!
        price: Int!
        categoryId: ID!
    }

    extend type Query {
        products: [Product]
        product(id: ID!): Product
    }

    extend type Mutation {
        deleteProduct(id: ID!): Int
        createProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductInput!): Product
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
