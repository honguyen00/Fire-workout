const { Schema, model } = require('mongoose');

const setSchema = new Schema([
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
  ]);

module.exports = setSchema ;
