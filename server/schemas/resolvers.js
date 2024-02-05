const { User, Exercises } = require('../models');
const Workout = require('../models/Workout');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw AuthenticationError;
        },
        getExercises: async (parent, args, context) => {
            if(context.user) {
                const defaultEx = await Exercises.find({});
                const user = await User.findById(context.user._id).populate('created_exercises')
                const allExercise = defaultEx.concat(user.created_exercises);
                return allExercise;
            }
            throw AuthenticationError
            
        },
        getPersonalExercises: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('created_exercises');
                return user.created_exercises;
            }   
            throw AuthenticationError
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
        },
        createNewExercise: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                user.created_exercises.push({name: args.exerciseName, muscle: args.muscle, customed: true});
                await user.save();
                return user
            }
            throw AuthenticationError;
        },
        addWorkout: async(parent, args, context) => {
            console.log(args);
            if(context.user) {
                const workout = await Workout.create({userId: context.user._id, ...args});
                return workout
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers;