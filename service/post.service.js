const PostDto = require("../dtos/post.dto");

const BaseError = require("../errors/base.error");
const postModel = require("../models/post.model")
const fileService = require("./file.service")
class PostService{

    async create(post, picture, author){
        const fileName = fileService.save(picture)
        console.log(fileName);
        const newPost = await postModel.create({...post, picture: fileName, author})
        return newPost
    }

    async getAll(){
        const allPosts = await postModel.find()
        return allPosts
    }

    async delete(id){
        const post = await postModel.findByIdAndDelete(id)
        return post
    }

    async edit(post, id){
        if(!id){
            throw new Error("Id not found")
        }
        const data = await postModel.findById(id)
        if(!data){
            return BaseError.BadRequest()
        }
    
        
        const updateData = await postModel.findByIdAndUpdate(id, post, {new: true, }) 
       
        
        return updateData
    }

 
    async detail(id){
        if(!id){
            throw new Error("Id not found")
        }
        const post = await postModel.findById(id)
        

        return  post
    }

    
}



module.exports = new PostService()