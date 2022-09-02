const {Schema, model} =require('mongoose');

const userSchema= new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            //valid email
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends:[
            {
                type: Schema.Types.ObjectID,
                ref: 'User',
            }
        ]
    },
    {
        toJSON:{
            virtuals: true,
        },
    }
);

//create virtual property "friendCount" that get friend count
userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length;
    })

const User= model('user', userSchema);

module.exports= User;