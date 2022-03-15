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
        let updateblog = req.params.blogId
        let = await blogModel.findById(updateblog)
        if (!updateblog) {
            return res.status(404).send({ msg: "Invalid Blog" })
        }
        let updatedata = req.body;
         updatedata.isPublished= true;
        let updatedUser = await blogModel.findOneAndUpdate({ _id: updateblog }, { title: updatedata.title, body: updatedata.body, tags: updatedata.tags, isPublished: updatedata.true, }, { new: true, upsert: true });
        res.status(200).send({ status: true, data: updatedUser })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

const deletebyId = async function (req, res) {
    try {
        let deleteblog = req.params.blogId;
        let = await blogModel.findById(deleteblog)
        if (!deleteblog) {
            return res.status(404).send({ msg: "is not deleted" });
        }
        let blogId = req.params.blogId;
        let userDel = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
        res.status(200).send({ status: true, data: userDel })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
};

const deleteByQuery = async function (req, res) {
    try {
        let query = req.query
        let filter = { ...query }
        let filterByquery = await blogModel.find(filter)
        if (filterByquery.length == 0) {
            return res.status(400).send({ msg: "Blog Not Found" })
        }
        else {
            let deletedDetails = await blogModel.findOneAndUpdate({ filter }, { isDeleted: true }, { new: true })
            return res.status(200).send({ msg: deletedDetails })
        }
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}



module.exports.createBlogs = createBlogs;
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deletebyId = deletebyId
module.exports.deleteByQuery = deleteByQuery
