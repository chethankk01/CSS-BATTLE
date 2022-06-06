const express = require("express")
const path = require("path")
const app = express()
const bodyparser=require("body-parser")
const sessions=require("express-session")
const cookieParser=require("cookie-parser")
app.use(bodyparser.json())
app.use(cookieParser());

app.set("view engine","ejs")
app.listen("3000")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.post("/battle",(req,res)=>{
    res.redirect(`/battle/${req.body.number}`)
})

app.get("/battle/:id",(req,res)=>{
    res.render("battle",{id:req.params.id})
})