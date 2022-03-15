const mongoose = require('mongoose');
const express = require('express');

const blogsSchema = new mongoose.Schema( {
    title : {type: String,
    required: true,
    },
    body : {type: String,
    required: true,
    },
    authorId : {
        type : Object,
        required:true,
        ref:"authormodel"
    },
        
    tags:{
        type:[]
    },
    category : {
        type:[],
        required: true,
    } ,
    subcategory :{ type:[],
    },
    isDeleted: {
        type: Boolean, default :false
    },
isPublished : {
    type: Boolean, default :false
}


}, {timestamps:true});

module.exports = mongoose.model('blogs',blogsSchema)