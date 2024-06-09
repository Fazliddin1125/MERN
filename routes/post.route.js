const express = require('express')
const router = express.Router()
const postModel = require("../models/post.model")
const PostController = require("../controllers/post.controller")
const authMiddleware = require('../middlewares/auth.middleware')
const authorMiddleware = require('../middlewares/author.middleware')


router.get("/get", PostController.getAll)
router.get("/static", PostController.getAll)
router.post('/create', authMiddleware, PostController.createPost)
router.delete('/delete/:id', authMiddleware, authorMiddleware ,PostController.deletePost)
router.put("/edit/:id", authMiddleware, authorMiddleware ,PostController.edit)
router.get("/get/:id", PostController.getOne)


module.exports = router
 