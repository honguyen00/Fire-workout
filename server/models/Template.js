const { Schema, model } = require('mongoose');

const templateSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        exerciseId: [{
            type: Schema.Types.ObjectId,
            ref: 'Exercises'
        }]
    }  
);

const Template = model('Template', templateSchema);

module.exports = Template;
