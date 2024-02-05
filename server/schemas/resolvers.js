const { User, Exercises, Template } = require('../models');
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
                const exercisesWithoutUserId = await Exercises.find({ userId: { $exists: false } });

                const exercisesWithUserId = await Exercises.find({ userId: context.user._id });

                const allExercises = exercisesWithoutUserId.concat(exercisesWithUserId);

                return allExercises;
            }
            throw AuthenticationError
            
        },
        getWorkoutHistory: async (parent, args,  context) => {
            if(context.user) {
                const workouts = await Workout.find({userId: context.user._id})
                .populate('exercises.exerciseId');
                return workouts;
            }
            throw AuthenticationError
        },
        getTemplate: async (parent, args, context) => {
            if(context.user) {
                const template = await Template.find({userId: context.user._id})
                .populate('exerciseId');
                return template
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
                console.log(context.user._id)
                const newex = await Exercises.create({name: args.exerciseName, muscle: args.muscle, userId: context.user._id})
                return newex
            }
            throw AuthenticationError;
        },
        addWorkout: async(parent, args, context) => {
            if(context.user) {
                const workout = await Workout.create({userId: context.user._id, ...args});
                return workout
            }
            throw AuthenticationError
        },
        createTemplate: async(parent, args, context) => {
            console.log(args)
            if(context.user) {
                const template = await Template.create({ userId: context.user._id, exerciseId: args.id });
                return template;
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers;