const {request}= require("express")
const res = require("express/lib/response")
const jwt = require("jsonwebtoken")
const fbusermodel = require("../models/fbusermodel")


const createfbUser = async function (req, res)  {
  try {
    let data = req.body
    console.log(data)
    if ( Object.keys(data).length != 0){
        let data = req.body;
        let savedData = await fbusermodel.create(data);
        res.status(200).send({ msg: savedData });
    }
  
    else res.status(400).send({ msg: "BAD REQUEST"})
      }
      catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })

      }
    }


    let fbloginUser = async function (req,res){
      try{
        let data = req.body
        console.log(data)
        if (Object.keys(data).length!=0){
          let userName = req.body.emailId;
        let password = req.body.password;
         let user = await userModel.findOne({emailId:userName, password: password});
         if (!user) return res.status(400).send({msg:"Email id and password not matched"})
        }
      }
         catch (err) {
          console.log("This is the error :", err.message)
          res.status(500).send({ msg: "Error", error:err.message})
        }
     
    };

  module.exports.createfbUser=createfbUser
  module.exports.fbloginUser=fbloginUser