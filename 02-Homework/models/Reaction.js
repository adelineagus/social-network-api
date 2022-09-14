const {Schema, Types, model} =require('mongoose');
const moment= require('moment');

const reactionSchema= new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
        },

        username:{
            type: String, 
            required:true,
        },

        createdAt:{
            type:Date,
            default:Date.now,
            get:formatDate
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

function formatDate(createdAt) {
    return moment(createdAt).format("MMM Do, YYYY")
}; 


module.exports=reactionSchema;