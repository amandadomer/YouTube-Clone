const { Comment, validateComment, validateReply } = require('../modules/comment');
const express = require('express');
const router = express.Router();

router.get('/:videoId', async (req,res) => {
    try{
        const comment = await Comment.find({videoId: req.params.videoId});
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

module.exports = router;