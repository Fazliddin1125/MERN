module.exports = class PostDto {
    id
    author
    title
    body
    constructor(model){
        this.id = model._id
        this.author = model.author
        this.title = model.title
        this.body = model.body
    }
}