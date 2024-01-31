const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
    }

    type Exercise {
        _id: ID
        name: String
        muscle: String
        equipment: String
        instructions: String
        difficulty: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getExercises: [Exercise]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updatePassword(password: String!): User
    }
`;

module.exports = typeDefs;