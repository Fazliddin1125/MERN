const postModel = require("../models/post.model")
const postService = require("../service/post.service")
const PostService = require("../service/post.service")

class PostController{
    async getAll(req, res){
        try{
            const allPosts = await PostService.getAll()
            res.status(200).json(allPosts)
        }catch(error){
            res.status(500).json(error)
        }
    }

    async createPost(req, res){
        try {
           
            const post = await PostService.create(req.body, req.files.picture, req.user.id)
            res.status(201).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deletePost(req, res){
        try{
            const post =  await postService.delete(req.params.id)
            req.status(200).json(post)
        }catch(error){
            res.status(500).json(error)
        }
    }

    async edit(req, res){
        try {
            const{body, params} = req
            const post = await postService.edit(body, params.id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res){
        try {
            const detail = await postService.detail(req.params.id) 
            const newobj = {
                id: detail._id,
                title: detail.title,
                body: detail.body,
                is_pay: false
            }                  
            res.status(200).json(newobj)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    
}

module.exports = new PostController()