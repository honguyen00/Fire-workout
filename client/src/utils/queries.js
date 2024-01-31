import { gql } from '@apollo/client'

export const GET_ME = gql`
query Query {
    me {
      _id,
      email
      username
    }
  }
`;

export const GET_EXERCISES = gql`
query Query {
    getExercises {
      _id
      difficulty
      equipment
      instructions
      muscle
      name
    }
  }
`;