const connectDB = require ('./startup/db');
const express = require('express');
const app = express();
const comment = require('./routes/comments');

connectDB();