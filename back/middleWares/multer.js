
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = `${path.extname(file.originalname)}`
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })

// const storage = multer.memoryStorage()
  
 export const upload = multer({ storage: storage })



console.log(upload)



