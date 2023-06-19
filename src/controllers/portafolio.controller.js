const Portfolio = require('../models/Portfolio')
// const { uploadImage } = require('../config/cloudinary')
const fs = require('fs-extra')
const { uploadImage,deleteImage } = require('../config/cloudinary')

const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    res.render("portafolio/allPortfolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

const updatePortafolio = async(req,res)=>{
    // Verificar que el id del portafolio sea el mismo
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Si es TRUE, continuar con la edicion 
    if(portfolio._id.toString() !== req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
    res.redirect('/portafolios')
}

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body   
    const newPortfolio = new Portfolio({title,category,description})
    newPortfolio.user = req.user._id
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
    await newPortfolio.save()
    res.redirect('/portafolios')
}

module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}