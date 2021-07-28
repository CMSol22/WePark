const express = require('express');
const router = express.Router(); //Getting the Router from express
const user = require('../models/user');
const User = require('../models/user'); //Pulls in the user created in the model
const fetch = require('node-fetch');

//GET - Display users
router.get('/get', async (req, res) => {
    try { 
        const users = await User.find(); //Since this is asynchronous, it must be awaited; all users will be returned as soon as it's done executing
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message }); //500 means there's an error on the server; not the user's fault
    }
});

//POST - Create a user
router.post('/create', async (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        password: req.body.password
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser); //201 means the creation was successful; should always be used with a POST method; "serializing" the new user into json
    } catch (err) {
        res.status(400).json({ message: err.message }); //400 error is when the user input is wrong; no server error
    }
});

//PUT - Update a user
router.put('/update/:id', getUser, async (req, res) => {  //id is a parameter passed in by the user to specify what the target is
    if (req.body.fName != null) {
        res.user.fName = req.body.fName;
    }
    if (req.body.lName != null) {
        res.user.lName = req.body.lName;
    }
    if (req.body.userEmail != null) {
        res.user.userEmail = req.body.userEmail;
    }
    if (req.body.userName != null) {
        res.user.userName = req.body.userName;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//DELETE - Delete a user
router.delete('/delete/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Middleware; prevents you from having to rewrite the same thing over and over again; next tells the computer to move onto the next section of code
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id); //req.params.id correlates to the id variable passed into the router
        if (user == null) {
            return res.status(404).json({ message: 'Unable to find user' }); //404 means not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next(); //Move on to the next piece of middleware or the request itself
};

/*
function fetchDb (data, req, res, next) {
    fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success: ', data);
    })
    .catch((error) => {
        console.error('Error: ', error)
    })
}
*/

module.exports = router;