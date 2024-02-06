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
    userId
    name
    muscle
  }
}
`

export const ADD_WORKOUT = gql`
mutation AddWorkout($exercises: [ExerciseInput], $date: String!, $title: String!) {
  addWorkout(exercises: $exercises, date: $date, title: $title) {
    _id
    date
    exercises {
      exerciseId {
        name
      }
      sets {
        repetitions
        weight
      }
    }
    template
    title
  }
}
`
export const CREATE_TEMPLATE = gql`
mutation CreateTemplate($createTemplateId: [ID]!) {
  createTemplate(id: $createTemplateId) {
    userId
    exerciseId {
      _id
    }
  }
}
`

export const DELETE_TEMPLATE = gql`
mutation Mutation($templateId: ID!) {
  deleteTemplate(templateId: $templateId)
}
`
