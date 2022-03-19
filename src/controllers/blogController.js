const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")


const createBlogs = async function (req, res) {
   try {
      let blogs = req.body;
      if (Object.keys(blogs).length != 0) {
         let blogCreated = await blogModel.create(blogs);
         res.status(201).send({ msg: blogCreated });
      }
      else res.status(404).send({ msg: "bad request" })
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
         isdeleted: false,
         ispublished: false,
         ...query
      };
      let filterByquery = await blogModel.find(filter)
      if (filterByquery.length == 0) {
         return res.status(400).send({ msg: "Blog Not Found" })
      }
      else {
         return res.status(200).send({ msg: filterByquery })
      }
   } catch (err) {
      res.status(500).send({ statue: false, msg: err.message })
   }
}


const updateBlog = async function (req, res) {
   try {
      let data = req.body
      if (Object.keys(data).length !== 0) {
         data.isPublished = true
         data.publishedAt = Date.now()

         let id = req.params.blogId
         let check = await blogModel.findById(id)

         if (check) {
            if (check.isDeleted == false) {
               let results = await blogModel.findOneAndUpdate(
                  { _id: id },
                  data,
                  { new: true }
               )
               return res.status(200).send({ status: true, msg: results })
            } else {
               res.status(404).send({ status: false, msg: "The post is already removed from the server" })
            }

         } else {
            res.status(404).send({ status: false, msg: "Please provide valid blog Id" })
         }

      } else {
         res.status(404).send({ status: false, msg: err.message })
      }


   } catch (err) {

      res.status(400).send({ status: false, msg: err.message })
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
         let blogDetails = await blogModel.updateOne({ _id: blogId }, { $set: { isDeleted: true, } }, { new: true })
         res.status(201).send({status: true, data:deleteblogs, msg: "blog deleted" })
         console.log(blogDetails)
      }
   }
   catch (error) {
      console.log(error)
      res.status(500).send({ msg: error.message })
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
         res.status(201).send({status: true, msg: "blog deleted " })
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
