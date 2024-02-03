const { Schema, model } = require('mongoose');

const setSchema = new Schema({
  sets: [
    {
      repetitions: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    }
  ],
});

module.exports = setSchema ;
