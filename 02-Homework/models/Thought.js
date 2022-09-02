const {Schema, model} =require('mongoose');
const reactionSchema= require('./Reaction');

const thoughtSchema= new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength:1,
            maxlength:280
            
        },

        createdAt: {
            //date
            //set default valud to current timestamp
            //use getter method to format timestamp
        },

        username:{
            type:String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON:{
            virtuals: true,
        },
    }
);

//create virtual property "friendCount" that get friend count
thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    })

const Thought= model('thought', thoughtSchema);

module.exports= Thought;