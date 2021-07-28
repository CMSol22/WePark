const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  //A Schema is basically a table in SQL; Allows you to create an object with specific properties
    fName: {
        type: String,
        required: true  //type and required are properites of fName
    },
    lName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);  //Exports the Schema for use; model takes two params: (name of model in db, name of schema)
//Model allows us to interact directly with the db using the Schema