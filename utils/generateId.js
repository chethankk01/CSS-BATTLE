const Id = require("../models/id")

const generateId = async ()=>{
    const id = await Id.findOne({createdAt:-1})
}