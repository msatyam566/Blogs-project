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
            return res.status(400).send({ msg: "Blog not found" })
        }
        else {
            return res.status(200).send({ msg: filterByquery })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const updateBlog = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            data.isPublished = true
            data.publishedAt = new Date()


            let id = req.params.blogId
            let check = await blogModel.findById(id)
            
            if (check) {
                if (check.isDeleted == false) {
                    let results = await blogModel.findOneAndUpdate(
                        { _id: id },
                        data,
                      

                    )
                    return res.status(200).send({ status: true, msg: results })



                } else {
                    res.status(404).send({ status: false, msg: "The post is already removed from the server" })
                }

            } else {
                res.status(404).send({ status: false, msg: "Please provide valid blog Id" })
            }

        }else{
            res.status(404).send({status :false, msg:err.message })
        }


    } catch (err) {

        res.status(400).send({ status: false, msg: err.message })
    }

}
const deletebyId = async function (req, res) {
    try {
        let id = req.params.blogId
        let check = await blogModel.findById(id)
        console.log(check)
        if (check) {
            if (check.isDeleted == false){
                let results = await blogModel.updateOne(
                    {_id : id},
                    {$set: { isDeleted:true}}
                )
                return res.status(200).send({ status: true, data : results})
            }else {
                res.status(404).send({ status: false, msg: "The post is already removed from the server" })
            }
        }else {
            res.status(404).send({ status: false, msg: "Please provide valid blog Id" })
        }
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
};

const deleteByQuery = async function (req, res) {
    try {
        let { category, authorId, tags, subCategory, isPublished } = req.query
        let obj = {}
        if (category != null) obj.category = category
        if (authorId != null) obj.authorId = authorId
        if (tags != null) obj.tags = tags
        if (subCategory != null) obj.subCategory = subCategory
        obj.isPublished = false
        if(isPublished != null) obj.isPublished=isPublished

        if (isPublished == true) {
            res.status(404).send({ status: false, msg: "Cannot delete--- already published" })
        } 

        let result = await blogModel.findOneAndUpdate(
            obj,
            { $set: { isDeleted: true } }
        )
        if (result) {
            res.status(200).send({ status: true, data : result })

        } else {
            res.status(404).send({ status: false, msg: "following match does not exist" })
        }





    } catch (err) {
        res.status(404).send({ status: false, msg: err.message })
    }


}



module.exports.createBlogs = createBlogs;
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deletebyId = deletebyId
module.exports.deleteByQuery = deleteByQuery
