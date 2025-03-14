import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query Category($id: ID!) {
    category(id: $id) {
      _id
      name
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
