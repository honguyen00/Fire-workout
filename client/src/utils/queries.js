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

export const GET_WORKOUT = gql`
query GetWorkoutHistory {
  getWorkoutHistory {
    _id
    title
    date
    exercises {
      sets {
        repetitions
        weight
      }
      exerciseId {
        name
      }
    }
  }
}
`;

export const GET_TEMPLATE = gql`
query Query {
  getTemplate {
    _id
    exerciseId {
      name
      _id
      difficulty
      equipment
      instructions
      muscle
      userId
    }
  }
}
`

export const GET_DATE = gql`
query Query {
  getWorkoutDate
}
`
