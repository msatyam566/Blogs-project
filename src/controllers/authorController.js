const authorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try{
       let author = req.body;
       if(Object.keys(author).length != 0){
       let authorCreated = await authorModel.create(author);
       res.status(201).send({ msg: authorCreated });
     }
     else res.status(404).send({msg:"bad request"})
    }
    catch(err){
       console.log("this is the error:",err.message)
        res.status(500).send({msg:"Error",error:err.message})
     }
  };

module.exports.createAuthor= createAuthor
