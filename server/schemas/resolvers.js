const { User, Exercises } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw AuthenticationError;
        },
        getExercises: async (parent, args) => {
            return Exercises.find({})
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        updatePassword: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                user.password = args.password
                await user.save();
                return user;
            }
            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;