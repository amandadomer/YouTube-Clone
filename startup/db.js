const mongoose = require('mongoose');
const config = require('config');

function connectDB() {
<<<<<<< HEAD
    mongoose.connect(
        config.get('mongoURI'),
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => {
        console.log(`Could not connect to MongoDB. ERROR: ${err}`);
        process.exit(1);
    });
=======
mongoose.connect (
        config.get('mongoURI'),
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));
>>>>>>> 4d7d24129381071737baf322ba345020cfe97603
}

module.exports = connectDB;