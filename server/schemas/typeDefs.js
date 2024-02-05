const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        created_exercises: [Exercise]!
    }

    type Exercise {
        _id: ID
        name: String
        muscle: String
        equipment: String
        instructions: String
        difficulty: String
        userId: ID
    }

    type Workout {
        _id: ID
        userId: ID
        title: String
        date: String
        exercises: [SetsOutput]
        template: Boolean
    }

    type Template {
        _id: ID
        userId: ID
        exerciseId: [Exercise]
    }

    type Set {
        repetitions: Int
        weight: Float
    }

    type SetsOutput {
        exerciseId: Exercise
        sets: [Set]
    }

    type Auth {
        token: ID!
        user: User
    }

    # Create an input type for Exercise
    input ExerciseInput {
        exerciseId: ID!
        sets: [SetInput]
    }

    # Create an input type for Set
    input SetInput {
        repetitions: Int!
        weight: Float!
    }

    input templateInput {
        exerciseId: [ID]!
    }

    type Query {
        me: User
        getExercises: [Exercise]
        getPersonalExercises: [Exercise]
        getWorkoutHistory: [Workout]
        getTemplate: [Template]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updatePassword(password: String!): User
        createNewExercise(exerciseName: String!, muscle: String!): Exercise
        addWorkout(title: String!, date: String!, exercises: [ExerciseInput]): Workout
        createTemplate(id: [ID]!): Template
    }
`;

module.exports = typeDefs;