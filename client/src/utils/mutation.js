import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const UPDATE_PASSWORD = gql`
mutation Mutation($password: String!) {
    updatePassword(password: $password) {
      _id
      email
      username
    }
  }
`;

export const CREATE_EXERCISE = gql`
mutation Mutation($exerciseName: String!, $muscle: String!) {
    createNewExercise(exerciseName: $exerciseName, muscle: $muscle) {
      _id
      created_exercises {
        _id
        name
        muscle
      }
    }
  }
`

export const ADD_WORKOUT = gql`
mutation Mutation($title: String!, $date: String!, $exercises: [ExerciseInput]) {
  addWorkout(title: $title, date: $date, exercises: $exercises) {
    _id
    title
    date
    exercises {
      _id
      sets {
        repetitions
        weight
      }
    }
  }
}
`