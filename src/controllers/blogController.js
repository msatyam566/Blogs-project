const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")


const createBlogs = async function (req, res) {
   try {
      let blogs = req.body;
      if (Object.keys(blogs).length != 0) {
         let blogCreated = await blogModel.create(blogs);
         res.status(201).send({ msg: blogCreated });
      }
      else res.status(404).send({ status: false, msg: "No Such Author is Present,Please check authorId" })
   }
   catch (err) {
      console.log("this is the error:", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
   }
};


const getBlog = async function (req, res) {
   try {
      let query = req.query
      let filter = {
          isDeleted: false,     
          isPublished: true,
          ...query
      }
  
      const filterByQuery = await blogModel.find(filter)  
      if(filterByQuery.length == 0) {
          return res.status(404).send({status:false, msg:"No blog found"})
      }
      console.log("Data fetched successfully")
      return res.status(201).send({status:true, data:filterByQuery})
  }
  catch(err) {
  console.log(err)
  res.status(500).send({status:false, msg: err.message})
  }
  }


const updateBlog = async function (req, res) {
   try {
      let id = req.params.blogId;
      let data = req.body;
      const updateData = await blogModel.findById(id)
      if (updateData.isDeleted==true) {
        res.status(404).send({ status: false, msg:err.message})
      }
      data.publishedAt = new Date();
      data.isPublished = true;
      const dataMore = await blogModel.findByIdAndUpdate(id, data, { new: true, upsert: true });
      res.status(201).send({ status: true, msg: dataMore })
    } catch (err) {
      res.status(500).send({ status: false, Error:"not match" });
    }
  }



const deletebyId = async function (req, res) {
   try {
      let blogId = req.params.blogId
      if (!blogId) {
        res.status(400).send({ status: false, msg: "blogId is required, BAD REQUEST" })
      }
      let blogDetails = await blogModel.findOne({ _id: blogId }, { isDeleted: false })
      if (!blogDetails) {
        res.status(404).send({ status: false, msg: "blog not exist" })
      } else {
        let deleteBlogs = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt :Date.now} }, { new: true });
           res.status(201).send({ status: true, data: deleteBlogs, msg:"blog deleted " });
        console.log(blogDetails)
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).send({ status: false, msg: error.message })
    }
  }

const deleteByQuery = async function (req, res) {
   try {
      let authorIds = req.query.authorId
      let categorys = req.query.category
      let tag = req.query.tags
      let subcategorys = req.query.subcategory
      if (authorIds && categorys && tag && subcategorys) {
         res.status(400).send({ status: false, msg: "query is required, BAD REQUEST" })
      }
      let authorDetails = await authorModel.findById({ _id: authorIds })
      if (!authorDetails) {
         res.status(404).send({ status: false, msg: "authorId not exist" })
      } else {
         let updatedDetails = await blogModel.findOneAndUpdate({ $or: [{ authorId: authorIds }, { category: categorys }, { tags: { $in: [tag] } }, { subcategory: { $in: [subcategorys] } }] }, { isDeleted: true })
         res.status(201).send({ status: true, msg: "blog deleted " })
         req.body.deletedAt = new Date()
         console.log(updatedDetails)
      }

   }
   catch (error) {
      console.log(error)
      res.status(500).send({ msg: error.message })
   }
}




module.exports.createBlogs = createBlogs;
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deletebyId = deletebyId
module.exports.deleteByQuery = deleteByQuery
