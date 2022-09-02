const {User, Thought}=require('../models');

module.exports={
    getThoughts(req,res){
        Thought.find()
            .then((thoughts)=>res.json(thoughts))
            .catch((err)=>res.status(500).json(err));
    },

    getSingleThought(req,res){
        Thought.findOne({_id:req.params.thoughtId})
            .then((thought)=>
                !thought
                    ? res.status(404).json({message: 'No thought with this ID'})   
                    : res.json(thought)
            )
            .catch((err)=>res.status(500).json(err));
    },
    createThought(req,res){
        Thought.create(req.body)
            .then((thought)=>{
                return User.findOneandUpdate(
                    {_id:req.body.userId},
                    {$addToSet:{thoughts:thought._id}},
                    {new:true}
                );
            })
            .then((user)=>
                !user
                ? res.status(400).json({message: 'thought is created, but no found user with id'})
                : res.json('Thoughts are created')
            )
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            })
    },

    updateThought(req,res){
        Thought.findOneandUpdate(
            {_id:req.params.thoughtId},
            {$set:req.body},
            {runValidators: true, new:true}
        )
        .then((thought)=>
            !thought
                ?res.stauts(404).json({message: 'no thoughts with this id'})
                :res.json(thoughts)
            )
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    deleteThought(req,res){
        Thought.findOneandRemove({_id:req.params.thoughtId})
            .then((thought)=>
                !thought
                    ? res.status(404).json({message: 'no thought with this id'})
                    : User.findOneandUpdate(
                        {thought:req.params.thoughtId},
                        {$pull:{thought:req.params.thoughtId}},
                        {new: true}
                    )
            )
            .then((user)=>
                !user
                    ? res.status(404).json({message: 'thought is deleted, but no user found'})
                    : res.json ({message: 'thought successfully deleted'})
            )
            .catch((err)=>res,status(500).json(err));
    },

    addReaction(req,res){
        Thought.findOneandUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reaction:req.body}},
            {runValidators:true, new: true}
        )
        .then((thought)=>
            !thought
                ? res.status(404).json({message: 'no thought with this id'})
                : res.json(thought)
        )
        .catch((err)=>res.status(500).json(err));
    },

    deleteReaction(req,res){
        Thought.findOneandUpdate(
            {_id:req.params.thoughtId},
            {$pull: {reaction:{reactionId:req.params.reactionId}}},
            {runValidators: true, new:true}
        )
        .then((thought)=>
            !thought
                ? res.status(404).json({message: 'no thought with this id'})
                : res.json(thought)
        )
        .catch((err)=>res.status(500).json(err));
    },


}