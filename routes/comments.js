const { Comment, validate } = require('../modules/comment');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const comment = await Comment.find();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;