const express = require('express');
const router = express.Router();


const authorControllers = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/authors",authorControllers.createAuthor)
router.post("/createblogs",blogController.createBlogs)
router.get("/getBlog" , blogController.getBlog)
router.put("/blogs/:blogId" , blogController.updateBlog)
router.delete("/deleteBlogs/:blogId", blogController.deletebyId)
router.delete("/deleteBlogs", blogController.deleteByQuery)






module.exports = router;