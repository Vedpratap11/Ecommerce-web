import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"


async function uploadToCloudinary(req) {

        // Configuration
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key:process.env.API_KEY , 
            api_secret:process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
        });
        
        // Upload an image
         const uploadResult = await cloudinary.uploader
           .upload(
                req.file.path, {
                   folder: "ecommerce",
               }
           )
           .catch((error) => {
               console.log(error);
               return(uploadResult.secure_url)
           });
        
        console.log(uploadResult);
        
        
      
    }

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key:process.env.API_KEY , 
//         api_secret:process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//             req.file.path, {
//                folder: "ecommerce",
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//            return(uploadResult.secure_url)
//        });
    
//     console.log(uploadResult);
    
    
  
// })(); //IIFE - Immediately invoked function expression.
export default uploadToCloudinary