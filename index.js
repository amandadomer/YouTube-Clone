const connectDB = require ('./startup/db');
const express = require('express');
const app = express();
const comment = require('./routes/comments.js');

connectDB();

app.use(express.json());
app.use('/api/comments', comment)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});