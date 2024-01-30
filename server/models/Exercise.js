const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    muscle: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
    },
    instructions: {
      type: String,
    },
    difficulty: {
        type: String
    }
  }
);

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
