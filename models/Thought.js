const {Schema, model} =require('mongoose');
const reactionSchema= require('./Reaction');
var moment=require("moment");

const thoughtSchema= new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength:1,
            
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },

        username:{
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON:{
            virtuals: true,
            getters:true
        },
        id:false,
    }
);

function formatDate(createdAt) {
    return moment(createdAt).format("MMM Do, YYYY")
} 

//create virtual property "friendCount" that get friend count
thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    })

const Thought= model('thoughts', thoughtSchema);

module.exports= Thought;