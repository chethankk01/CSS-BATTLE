const express = require("express")
const path = require("path")
require("dotenv").config();
const bodyparser=require("body-parser")
const sessions=require("express-session")
const cookieParser=require("cookie-parser")
const Id=require("./models/id");
// const mongoose  = require("mongoose")
const upload = require("./utils/fileUpload")

const PORT = 3000;
// const MONGO_URL = process.env.MONGO_URL

const app = express()
app.use(bodyparser.json())
app.use(cookieParser());

// mongoose.connect(MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once("open",()=>{
//     console.log("Database connected");
// }).on("error",(err)=>{
//     console.error("Error: "+err);
// })
// console.log(db.ids.collections());
// for(let i=0;i<31;i++){
//     const id1=new Id({id:"elisiyabattle"+i+1});
//     id1.save();
// }
app.use(sessions({
    secret:"thisismysecret",
    saveUninitialized:false,
    cookie:{maxAge:4000000000000},
    resave:false
}))


app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.delete("/delete",async (req,res)=>{
    try{
        const response = await Id.deleteMany({id:RegExp("^elisiya")});
        console.log(response);
        res.status(200).json({            
            message:response
        })
    }catch(error){
        res.status(400).json({
            error:error
        })
    }

})

app.get("/",(req,res)=>{
    // if(!req.session.userId){
    res.render("home")
    // }else{
    //     res.redirect(`/battle/${req.session.number}`);
    // }
})

app.post("/",(req,res)=>{
    const {key,number}=req.body    
    req.session.userId = key
    req.session.number = number
    console.log(key); 
    res.redirect(`/battle/${req.session.number}`)
})

app.get("/battle/:id",(req,res)=>{
    if(req.session.userId){
    res.render("battle",{id:req.params.id})
    }else{
        res.redirect("/");
    }
})

app.post("/api/images",upload.single("file"),(req,res)=>{      
    console.log(req.file);
    // res.render("end")
})

app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`);
})

