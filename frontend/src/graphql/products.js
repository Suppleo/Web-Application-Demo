import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  {
    products {
      _id
      name
      price
      category {
        _id
        name
      }
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
      _id
      name
      price
      category {
        _id
        name
      }
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      _id
      name
      products {
        _id
        name
        price
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      price
      category {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      _id
      name
      price
      category {
        _id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
