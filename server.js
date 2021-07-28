require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DATABASE_URL, { //Processes the URL in the evnironment file, and mongoose connects to it
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signUp.html');
});
app.get('/park', (req, res) => {
    res.sendFile(__dirname + '/parkMap.html');
});

app.listen(3000, () => console.log('Server has Started!'));