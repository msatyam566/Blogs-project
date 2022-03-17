const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth')


const authorControllers = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/authors",authorControllers.createAuthor)
router.post("/createblogs",middleware.authentication,blogController.createBlogs)
router.get("/getBlog" ,middleware.authentication, blogController.getBlog)
router.put("/blogs/:blogId" ,middleware.authentication,middleware.authorization, blogController.updateBlog)
router.delete("/deleteBlogs/:blogId",middleware.authentication,middleware.authorization, blogController.deletebyId)
router.delete("/deleteBlogs", blogController.deleteByQuery)
router.post("/login",authorControllers.authorLogin)






module.exports = router;