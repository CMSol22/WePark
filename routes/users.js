const express = require('express');
const router = express.Router();
const user = require('../models/user');
const User = require('../models/user')

//GET - Display users
router.get('/', async (req, res) => {
    try { 
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST - Create a user
router.post('/', async (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        password: req.body.password
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//PUT - Update a user
router.put('/:id', getUser, async (req, res) => {
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
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
};

module.exports = router;