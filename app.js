require("dotenv").config()

const express = require('express')
const app = express()
const mangoose = require("mongoose")
const postRoute = require("./routes/post.route")
const cookieParser = require("cookie-parser")
const requestTime = require("./middlewares/request-time")
const fileupload = require("express-fileupload")
const errorMiddleWare = require("./middlewares/error.middleware")

app.use(requestTime)
app.use(cookieParser({}))
app.use(express.json())
app.use(fileupload({}))
app.use("/static", express.static("static"))
// Routes
app.use('/api/post', postRoute)
app.use('/api/auth', require("./routes/auth.route"))

app.use(errorMiddleWare)

const PORT = process.env.PORT || 8080



// app.get("/", )

// app.post("/", async (req, res)=>{
//     try {
//         const{title, body} = req.body
//         const newpost = await postModel.create({title, body})
//         res.status(201).json(newpost)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// app.delete("/:id/:username", (req, res)=>{
//     const{id, username} = req.params
//     res.send(`${id}--${username}`)
// })

// app.put("/:id", (req, res)=>{
//     const {id} = req.params
//     const {title, body} = req.body
//     res.send({id, title, body})
// })
const mongo_password = "fhHHUuGJ5I6OUoMG"



const bootstrap = async ()=>{
    try{
        await mangoose.connect(process.env.DB_URL).then(()=>console.log("Connected to Database"))
    }
    catch (error) {
        console.log(`Error connecting with DB: ${error}`);
    }
}
bootstrap()

app.listen(PORT, ()=> console.log(`Listening on the  - http://localhost:${PORT}`))