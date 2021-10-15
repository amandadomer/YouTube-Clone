const { Comment, Reply, validateComment, validateReply } = require('../models/comment');
const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.get('/:videoId', async (req,res) => {
    try{
        const comment = await Comment.find({videoId: req.params.videoId});
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/reply/:id', async (req, res) => {
    try {
        const { error } = validateReply(req.body);
        if (error) return res.status(400).send(error);
        
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        
        const reply = new Reply({
            text: req.body.text
        })
        comment.replies.push(reply);
        
        await comment.save();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) =>{
    try{
        const { error } = validateComment(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            text: req.body.text,
            videoId: req.body.videoId,
        });
        await comment.save();

        return res.send(comment);

        }  catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/likes/:id', async (req, res) => {
    try {
    const comment = await Comment.findById(req.params.id);
        if (!comment)   
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        
        comment.likes++
        
        await comment.save();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/dislikes/:id', async (req, res) => {
    try {
    const comment = await Comment.findById(req.params.id);
        if (!comment)   
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        
        comment.dislikes++
        
        await comment.save();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;