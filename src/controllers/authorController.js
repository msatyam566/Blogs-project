const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
   try {
      let author = req.body;
      if (Object.keys(author).length != 0) {
         let authorCreated = await authorModel.create(author);
         res.status(201).send({ msg: authorCreated });
      }
      else res.status(404).send({ msg: "bad request" })
   }
   catch (err) {
      console.log("this is the error:", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
   }
};

const authorLogin = async function(req,res){
   try{
        let data =req.body;
        if(Object.keys(data).length==0){
            res.status(400).send({status:false,msg:"kindly pass Some Data"})
        }
        let username = req.body.email;
        let password = req.body.password;
        let user = await authorModel.findOne({email: username, password: password});
        if(!user)
            return res.status(400).send({
               status : false,
               msg:"username or password are not matching",
            });
        
        let token = jwt.sign({
             userId: user._id,
             email :username
             
           },
           "satyam566"
           );
           res.setHeader("x-api-key",token);
         res.status(201).send({status: true, data: token})
        
   }
   catch (err) {
      res.status(500).send({ Error: err.message })
   }
}



module.exports.createAuthor = createAuthor
module.exports.authorLogin = authorLogin

