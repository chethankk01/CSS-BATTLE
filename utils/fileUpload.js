const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{                
        const id = req.session.userId
        const path = `public/submission/${id}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
        cb(null, path);        
    },filename:(req,file,cb)=>{                
        cb(null,file.originalname+"-"+Date.now())
    }
})

const upload = multer({
    storage
})

module.exports = upload