const {Schema, model} =require('mongoose');

const reactionSchema= new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username:{
            type: String, 
            required:true,
        },

        createdAt:{
            //date
            //set default value to current
            //use getter method to format timestamp
        }
    },
);