const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema( {
    title: { 
        required:true,
        type:String
   },
    body: {
     type:String,
     required :true
    },
    authorId: {
        type:ObjectId,
        required:true,
        ref:"authorModel"
    },
    tags: { 
        type:[String]
    },
    category: {
        type:[String],
          required:true,
    },
    subcategory: {
        type:[String],
    },
    isDeleted: { 
        type:Boolean,
         default: false 
        },
    deletedAt : { type : Date ,
        default : Date.now     
    }, 
    
    isPublished: {
        type:Boolean,
         default: false },
    publishedAt: { type : Date ,
        default : Date.now,      
    }
}, { timestamps: true });   
   

module.exports = mongoose.model('blogs',blogsSchema)