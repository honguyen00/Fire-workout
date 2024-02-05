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
        customed: Boolean
    }

    type Workout {
        _id: ID
        userId: ID
        title: String
        date: String
        exercises: [Exercise]
    }

    type Set {
        repetitions: Int
        weight: Float
    }

    type Exercise {
        exerciseId: ID!
        sets: [Set]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getExercises: [Exercise]
        getPersonalExercises: [Exercise]
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

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updatePassword(password: String!): User
        createNewExercise(exerciseName: String!, muscle: String!): User
        addWorkout(title: String!, date: String!, exercises: [ExerciseInput]): Workout
    }
`;

module.exports = typeDefs;