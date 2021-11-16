const express = require('express')
const router =express.Router()

//to submit data , to get data use models
const Post =require('../models/Post')

//GET BACK ALL THE POST
router.get('/', async (req,res)=>{
    try{
        //.find is method given by mongoose
        //.limit can limit the data
       const posts = await Post.find();
       res.json(posts);

    }
    catch(err){
        res.json({message: err})
    }
});

//SUBMIT ALL THE POST
router.post('/', async (req,res)=>{
  console.log(req.body.title);
  const post = new Post({
    title: req.body.title,
    description: req.body.description
}) 
//TO SAVE THE POST IN DATABASE
try{
    const savedPost=await post.save()
    res.json(savedPost);
}
catch(err){
    res.json({message: err})
}

  
})


//TO  GET SPECIFIC POST
//dynamic parameters
//find specific post by url
router.get('/:postId',async (req,res)=>{
    try{
   const post = await Post.findById(req.params.postId)
    res.json(post);
    }catch(err){
        res.send({message: err})
    }
})

//TO DELETE A SPECIFIC POST
router.delete('/:postId',async (req,res)=>{
    
    try{
        const removedPost = await Post.deleteOne({_id: req.params.postId})
         res.json(removedPost);
         }catch(err){
             res.send({message: err})
         }
})

//uTO UPDATE A SPECIFIC POST
router.patch('/:postId',async (req,res)=>{
    try{
        const updatepost = await Post.updateOne({_id: req.params.postId},{$set: {title: req.body.title}});
         res.json(updatepost);
         }catch(err){
             res.send({message: err})
         }
})

module.exports=router;