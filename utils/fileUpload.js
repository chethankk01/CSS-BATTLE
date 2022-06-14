const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{                
        const id = req.session.userId
        const path = `public/submission/${id}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
        cb(null, path);        
    },filename:(req,file,cb)=>{   
        const extension = path.extname(file.originalname)     
        const fileName = path.basename(file.originalname,extension)           
        cb(null,fileName+"-"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

module.exports = upload