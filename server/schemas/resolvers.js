const { User, Exercises, Template, Workout } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51OgfiuDnxOGikg97qQmLP0hXTi0sRy5T01mX0GV1YSX0IKHApR1glcDcyuvxSQVXyxMI4nomzEjYePawYjB0dHsM009XJP94ZW');

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
        },
        getWorkoutDate: async (parent, args,  context) => {
            if(context.user) {
                const workouts = await Workout.find({userId: context.user._id})
                // Extract dates from the workouts array
                const datesArray = workouts.map(workout => workout.date);
                return datesArray;
            }
            throw AuthenticationError
        },
        checkout: async (paren, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const line_items = [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'One-time Support Payment'
                    },
                    unit_amount: 500
                },
                quantity: 1
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`,
            });

            return { session: session.id };
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
            if(context.user) {
                const template = await Template.create({ userId: context.user._id, exerciseId: args.createTemplateId });
                return template;
            }
            throw AuthenticationError
        },
        deleteTemplate: async(parent, args, context) => {
            if(context.user) {
                const template = await Template.deleteOne({_id: args.templateId})
                return (template.deletedCount == 1)
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers;