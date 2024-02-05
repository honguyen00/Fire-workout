const { Schema, model } = require('mongoose');
const setSchema  = require('./Set')

const workoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    exercises: [
        {
            exerciseId: {type: Schema.Types.ObjectId, ref: 'Exercises'},
            sets: [setSchema]
        }
    ],
    template: {
      type: Boolean,
      default: false
    }
  }
);

const Workout = model('Workouts', workoutSchema);

module.exports = Workout;
