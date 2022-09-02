const {User, Thought}= require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
            .then((users)=>res.json(users))
            .catch((err)=>res.status(500).json(err));
    },
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then((user)=>
                !user
                    ? res.status(404).json({message: 'No user with this ID'})
                    : res.json(user)
            )
            .catch((err)=>res.status(500).json(err));
    },
    createUser(req, res){
        User.create(req.body)
            .then((user)=>res.json(user))
            .catch((err)=>res.status(500).json(err));
    },

    updateUser(req,res){
        User.findOneandUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators: true, new: true}
        )
        .then((user)=>
            !user
                ? res.status(404).json({message: 'no user with this id'})
                : res.json (application)
        )
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req,res){
        User.findOneandDelete({_id:req.params.userId})
            .then((user)=>
                !user
                    ? res.status(404).json({message: 'No user with this ID'})
                    : Thought.deleteMany({_id:{$in: user.thought}})
            )
            .then(()=> res.json({message: 'User and thoughts are deleted'}))
            .catch((err)=>res.status(500).json(err));
    },

    addFriend(req,res){
        User.findOneandUpdate(
            {_id: req.params.userId},
            {$addToSet: {friend:req.body}},
            {runValidators:true, new: true}
        )
        .then((user)=>
            !user
                ? res.status(404).json({message: 'no user with this id'})
                : res.json(user)
        )
        .catch((err)=>res.status(500).json(err));
    },

    deleteFriend(req,res){
        User.findOneandUpdate(
            {_id:req.params.userId},
            {$pull: {friend:{friendId:req.params.friendId}}},
            {runValidators: true, new:true}
        )
        .then((user)=>
            !user
                ? res.status(404).json({message: 'no user with this id'})
                : res.json(user)
        )
        .catch((err)=>res.status(500).json(err));
    },

}