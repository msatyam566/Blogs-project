const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema( {

firstname : 
{ type : String, required : true},
lastName : 
{ type : String, required : true},
title: {
type : String,
enum: ["Mr.", "Mrs", "Miss"],
required: true
},

email: { type : String, required:true,
   validate:{
      validator:validator.isEmail,
        message:'{Value} is not a valid email',
        isAsync: false
    }
    },
 password : { type : String, required : true}
});





module.exports = mongoose.model('Author', authorSchema)
