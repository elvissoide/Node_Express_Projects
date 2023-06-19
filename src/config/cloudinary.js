const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

// Exportacion del por default del metodo uploadimage
module.exports.uploadImage = async(filePath) => {
    // Subir la imagen de la ruta (filepath) en la carpeta portafolio de cloudinary
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

module.exports.deleteImage = async (publicId)=>{
    return await cloudinary.uploader.destroy(publicId)
}